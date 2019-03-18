import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import {default as _rollupMoment} from 'moment';
import * as _moment from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { STATUT } from '../../../../config/enum-data';
import { BonDeCommande } from '../../../../models/bon-de-commande';
import { Demandes } from '../../../../models/demandes';
import { Articles } from '../../../../models/articles';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntrepriseUserInfos } from '../../../../models/entreprise-user-infos';
import { ActionsHistories } from '../../../../models/actions-histories';
import { ComptesInternes } from '../../../../comptabilite/models/comptes-internes';
import { BonDeCommandeService } from '../../../../services/bon-de-commande.service';
import { MessageboxService } from '../../../../services/messagebox.service';
import { EntrepriseUserInfosService } from '../../../../services/entreprise-user-infos.service';
import { ArticlesService } from '../../../../services/articles.service';
import { DemandeService } from '../../../../services/demande.service';
import { UserService } from '../../../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { enumSelector } from '../../../../shared/utilities/utilities';
import { YesNo } from '../../../../config/yes-no.enum';
import { PDFProgressData, PDFDocumentProxy } from 'pdfjs-dist';
const moment = _rollupMoment || _moment;
import * as jspdf from 'jspdf';
// jspdf.GlobalWorkerOptions.workerSrc = '';

import html2canvas from 'html2canvas';
import { Entreprise } from '../../../../models/entreprise-model';
import { EntrepriseService } from '../../../../services/entreprise.service';
import { ConfigService } from '../../../../services/config.service';
import { ImagesService } from '../../../../services/images.service';
import { FournisseursService } from '../../../../services/fournisseurs.service';
import { Fournisseurs } from '../../../../models/fournisseurs.model';
import { id } from '@swimlane/ngx-charts/release/utils';
import { EditFournisseurs } from '../../../../models/edit-fournisseurs';
import { FormeJuridique } from '../../../../models/forme-juridique';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-bon-pdf-view',
  templateUrl: './bon-pdf-view.component.html',
  styleUrls: ['./bon-pdf-view.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class BonPdfViewComponent implements OnInit , AfterViewInit {



  formeJuridiques: FormeJuridique[] = [
    {
      value: 0, label: 'EURL'
    },
    {
      value: 1, label: 'SARL'
    },
    {
      value: 2, label: 'SELAR'
    },
    {
      value: 3, label: 'SA'
    }
    ,
    {
      value: 4, label: 'SAS'
    }
    ,
    {
      value: 3, label: 'SASU'
    },
    {
      value: 4, label: 'SNC'
    }
    ,
    {
      value: 5, label: 'SCP'
    }



  ];
  statut = STATUT;
  actionLabel = 'Créer';
  fact: BonDeCommande = new BonDeCommande();

  demande: Demandes = new Demandes();
  productDetails: Articles = new Articles();
  bonDeCommandeForm: FormGroup;
  isLoading = true;
  userInfo: EntrepriseUserInfos = new EntrepriseUserInfos();
  workFlow: ActionsHistories[] = [];
  yesNo: any[];
  compteInternes: ComptesInternes[];
  button = 'Envoyer';
  bonRef = '';
  bon: BonDeCommande = new BonDeCommande();

  pdfSrc = '';
  pdf: any;
  entreprise: Entreprise = new Entreprise();
  imgUrl: string = ConfigService.rootUrl + '/api/entreprise/getlogo';

  imageToShow: any;
  isImageLoading: boolean;
  fournisseurs: EditFournisseurs = new EditFournisseurs();
  constructor(private fourniseurService: FournisseursService, private imageService: ImagesService, private entrepriseService: EntrepriseService, private bonDeCommandeService: BonDeCommandeService,  private dateAdapter: DateAdapter<Date>, private messageboxService: MessageboxService, private entrepriseUserinfos: EntrepriseUserInfosService, private articleService: ArticlesService, private demandeServices: DemandeService, private userServices: UserService, private fb: FormBuilder, public dialogRef: MatDialogRef<BonPdfViewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.bon.penalite = 0;
    this.fact = new BonDeCommande();
    this.fact.id = 0;
    // this.fact.tvaDeductible = YesNo.Oui;

    this.fact.montant = '0';
    this.dateAdapter.setLocale('fr');

    this.demande = this.data.demande;
    // this.getFacture(this.demande.id);


    this.yesNo = enumSelector(YesNo);


  }

  saveToPdf() {
    this.captureScreen();
  }


  ngAfterViewInit(): void {
  //  this.captureScreen();
  }
  public getformJuridique(value: number) {
    return this.formeJuridiques.find(e => e.value === Number(value)).label;
  }
  getFournisseur(Id) {
     this.fourniseurService.getFournisseursById(Id).subscribe(
       res => {
         this.fournisseurs = res;
       }
     );
  }
  getImageFromService() {
    this.isImageLoading = true;
    this.imageService.getImage(this.imgUrl).subscribe(data => {
    this.imageToShow = data;
    this.isImageLoading = false;

    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
}

  getEntrprise() {
    this.entrepriseService.getEntreprises().subscribe(
      res => {
        this.entreprise = res;
        this.getImageFromService();
      }
    );
  }

  public captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
       this.pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      this.pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      console.log(this.pdf.output('datauristring'));
      this.pdfSrc = this.pdf.output('bloburl');
     /*  const file = new Blob([this.pdf.output()], { type: 'application/pdf' });
      this.pdfSrc = URL.createObjectURL(file); */
      const fileName = this.bon.refBon + '.pdf';
      this.pdf.save(fileName); // Generated PDF
    });
  }


 getBon() {
   this.bonDeCommandeService.getBonDeCommandeBydemandId(this.demande.id).subscribe(res => {
     this.bon = res;
     if (res != null) {
       this.bonDeCommandeForm.get('refBon').setValue(this.bon.refBon);
       this.bonDeCommandeForm.get('montant').setValue(this.bon.montant);
       this.bonDeCommandeForm.get('dateOperation').setValue(this.bon.dateOperation);
       this.bonDeCommandeForm.get('id').setValue(this.bon.id);
       this.bonDeCommandeForm.get('accompte').setValue(this.bon.accompte);
       this.bonDeCommandeForm.get('penalite').setValue(this.bon.penalite);
       this.bonRef = this.bon.refBon;
       this.actionLabel = 'Modifier';
       this.getUserInfo(this.demande.userId);
       this.getProductDetaile(this.demande.productId);
       this.getWorkFlow(this.demande.id);


     } else {
       this.getRefBon(this.demande.id);
     }
   });
 }

  getStatut(value) {
    return STATUT.find(e => e.value === value);

  }

  getRefBon(demandeId) {
    this.bonDeCommandeService.getBonDeCommandeRef(demandeId).subscribe(res => {
      this.bonRef = res;
      this.bonDeCommandeForm.get('refBon').setValue(this.bonRef);
    });
  }


    ngOnInit() {
    (<any>window).pdfWorkerSrc = './assets/pdf.worker.js';
    this.getEntrprise();
    this.getBon();
    this.creaform();


  }
  creaform() {
this.bonDeCommandeForm = this.fb.group({
     id: [0, Validators.required],
     dateOperation: [moment()],
     refBon: [''],
     montant: [this.demande.montant, Validators.required],
     accompte: [0],
     penalite: [0]

});
// this.bonDeCommandeForm.get('tvaDeductible').valueChanges.subscribe(data => this.ontvaDeductible(data));
  }


 /*  getFacture(damandeId) {
    this.bonDeCommandeService.getBonDeCommandeBydemandId(damandeId).subscribe(res => {
      console.log(res);
      this.fact = res != null ? res : this.fact;
      if (this.fact.id > 0) {
        this.actionLabel = 'Modifier';

        this.bonDeCommandeForm.get('dateOperation').setValue(this.fact.dateOperation);
      //  this.bonDeCommandeForm.get('').setValue(this.fact.libele);
      }
    });
  } */
  onNoClick(): void {
    this.dialogRef.close({result: 0});
  }

  getUserInfo(Id) {
    this.entrepriseUserinfos.getEntrepriseUserInfosByUserId(Id).subscribe(res => {
      this.userInfo = res;
      console.log(res);
    }

    );
  }

  onProgress(progressData: PDFProgressData) {
    this.isLoading = true;
    // do anything with progress data. For example progress indicator
  }

  callBackFn(pdf: PDFDocumentProxy) {
    // do anything with "pdf"
    this.isLoading = false;
 }
  getWorkFlow(Id) {
    this.articleService.getworkFlowStatById(Id).subscribe(
    res => {
      this.workFlow = res;
    }
    );
  }
  getProductDetaile(Id) {
   this.articleService.getArticlesById(Id).subscribe(res => {
        this.productDetails = res;
        this.isLoading = false;
        this.getFournisseur(this.productDetails.fournisseursId);
        console.log(res);
   });
  }


  ontvaDeductible(data: any) {
      const tvaControl = this.bonDeCommandeForm.get('tva');
      console.log(data);
      if (data) {
             tvaControl.setValidators([Validators.required]);
      } else {
        tvaControl.setValidators([]);
      }

      tvaControl.updateValueAndValidity();
  }



  AddBonDeCommande () {
    const bonDeCommande = new BonDeCommande();
    bonDeCommande.id = this.fact.id;
     bonDeCommande.dateOperation = this.bonDeCommandeForm.get('dateOperation').value;
     bonDeCommande.montant = this.bonDeCommandeForm.get('montant').value;
     bonDeCommande.refBon = this.bonDeCommandeForm.get('refBon').value;
     bonDeCommande.accompte = this.bonDeCommandeForm.get('accompte').value;
     bonDeCommande.demandesId = this.demande.id;




    // approbationWorkflow.globalStatut=3;

     this.messageboxService.ShowMessage('Avertissement', 'approuvrer cette demandes ?', '', 2, false, 1, '520px', 'info', 'primary').subscribe(
       res => {
         const r: any = res;
         if (r.result === 'yes') {
           if (this.fact.id > 0) {
            this.bonDeCommandeService.updateBonDeCommande(bonDeCommande).subscribe(response => {
              console.log(response);
              this.messageboxService.ShowMessage('Information', ' Demande aprouvée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
              this.dialogRef.close({result: 1});
        });

           } else {
            this.bonDeCommandeService.addBonDeCommande(bonDeCommande).subscribe(response => {
              console.log(response);
              this.messageboxService.ShowMessage('Information', ' Demande aprouvée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
              this.dialogRef.close({result: 1});
        });

           }

         }
       }
     );
   }


}
