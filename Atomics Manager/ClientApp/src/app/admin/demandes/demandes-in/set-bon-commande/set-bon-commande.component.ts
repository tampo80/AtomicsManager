import { Component, OnInit, Inject } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { STATUT } from '../../../config/enum-data';
import { BonDeCommande } from '../../../models/bon-de-commande';
import { Demandes } from '../../../models/demandes';
import { Articles } from '../../../models/articles';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EntrepriseUserInfos } from '../../../models/entreprise-user-infos';
import { ActionsHistories } from '../../../models/actions-histories';
import { ComptesInternes } from '../../../comptabilite/models/comptes-internes';
import { enumSelector } from '../../../shared/utilities/utilities';
import { YesNo } from '../../../config/yes-no.enum';
import { BonDeCommandeService } from '../../../services/bon-de-commande.service';
import { MessageboxService } from '../../../services/messagebox.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserService } from '../../../services/user.service';
import { DemandeService } from '../../../services/demande.service';
import { EntrepriseUserInfosService } from '../../../services/entreprise-user-infos.service';
import { ArticlesService } from '../../../services/articles.service';
import {default as _rollupMoment} from 'moment';
import * as _moment from 'moment';
import { BonPdfViewComponent } from './bon-pdf-view/bon-pdf-view.component';
const moment = _rollupMoment || _moment;

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
  selector: 'app-set-bon-commande',
  templateUrl: './set-bon-commande.component.html',
  styleUrls: ['./set-bon-commande.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SetBonCommandeComponent implements OnInit {


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
  constructor( private dialog: MatDialog, private bonDeCommandeService: BonDeCommandeService,  private dateAdapter: DateAdapter<Date>, private messageboxService: MessageboxService, private entrepriseUserinfos: EntrepriseUserInfosService, private articleService: ArticlesService, private demandeServices: DemandeService, private userServices: UserService, private fb: FormBuilder, public dialogRef: MatDialogRef<SetBonCommandeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fact = new BonDeCommande();
    this.bon = new BonDeCommande();
    this.bon.id = 0;
    // this.fact.tvaDeductible = YesNo.Oui;
    this.fact.montant = '0';
    this.dateAdapter.setLocale('fr');
    this.demande = this.data.demande;
    // this.getFacture(this.demande.id);
    this.getUserInfo(this.demande.userId);
    this.getProductDetaile(this.demande.productId);
    this.getWorkFlow(this.demande.id);

    this.yesNo = enumSelector(YesNo);
    this.getBon();

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
     } else {
       this.bon = new BonDeCommande();
       this.bon.id = 0;
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

  getUserInfo(id) {
    this.entrepriseUserinfos.getEntrepriseUserInfosByUserId(id).subscribe(res => {
      this.userInfo = res;
      console.log(res);
    }

    );
  }


  getWorkFlow(id) {
    this.articleService.getworkFlowStatById(id).subscribe(
    res => {
      this.workFlow = res;
    }
    );
  }
  getProductDetaile(id) {
   this.articleService.getArticlesById(id).subscribe(res => {
        this.productDetails = res;
        this.isLoading = false;
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
    bonDeCommande.id = this.bon.id;
     bonDeCommande.dateOperation = this.bonDeCommandeForm.get('dateOperation').value;
     bonDeCommande.montant = this.bonDeCommandeForm.get('montant').value;
     bonDeCommande.refBon = this.bonDeCommandeForm.get('refBon').value;
     bonDeCommande.accompte = this.bonDeCommandeForm.get('accompte').value;
     bonDeCommande.penalite = this.bonDeCommandeForm.get('penalite').value;
     bonDeCommande.demandesId = this.demande.id;


     console.log(this.bon);

    // approbationWorkflow.globalStatut=3;

     this.messageboxService.ShowMessage('Avertissement', 'approuvrer cette demandes ?', '', 2, false, 1, '520px', 'info', 'primary').subscribe(
       res => {
         const r: any = res;
         if (r.result === 'yes') {
           if (this.bon.id > 0) {
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



   PdfView(demande: Demandes) {

    const dialogRef = this.dialog.open(BonPdfViewComponent, {
     data: {demande: demande},
     width: '980px',

     panelClass: 'atomics-dialog-container',
     disableClose: false
    });

    dialogRef.afterClosed().subscribe(res =>  {
      console.log(res);
      if (res.result === 1) {

        /// this.messageboxService.ShowMessage("Information","Departements ajouter avec succès","",0,false,1,'500px',"info",'primary');
      }
    }


    );
  }

}
