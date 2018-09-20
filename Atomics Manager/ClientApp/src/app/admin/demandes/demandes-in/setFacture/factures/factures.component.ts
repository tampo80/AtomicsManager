import { Component, OnInit, Inject } from '@angular/core';
import { STATUT } from '../../../../config/enum-data';
import { Articles } from '../../../../models/articles';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EntrepriseUserInfos } from '../../../../models/entreprise-user-infos';
import { ActionsHistories } from '../../../../models/actions-histories';
import { MessageboxService } from '../../../../services/messagebox.service';
import { EntrepriseUserInfosService } from '../../../../services/entreprise-user-infos.service';
import { ArticlesService } from '../../../../services/articles.service';
import { UserService } from '../../../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CommentAction } from '../../../../models/comment-action';
import { ActionsType } from '../../../../workflow/config/actions-type.enum';
import { DemandeService } from '../../../../services/demande.service';
import { YesNo } from '../../../../config/yes-no.enum';
import { enumSelector } from '../../../../shared/utilities/utilities';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { ComptesInternes } from '../../../../comptabilite/models/comptes-internes';
import { ComptesInternesService } from '../../../../comptabilite/services/comptes-internes.service';
import { Factures } from '../../../../models/factures';
import { FacturesService } from '../../../../services/factures.service';
import { Demandes } from '../../../../models/demandes';

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
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class FacturesComponent implements OnInit {

  statut = STATUT;
  actionLabel = 'Créer';
  fact: Factures = new Factures();

  demande: Demandes = new Demandes();
  productDetails: Articles = new Articles();
  facturesForm: FormGroup;
  isLoading = true;
  userInfo: EntrepriseUserInfos = new EntrepriseUserInfos();
  workFlow: ActionsHistories[] = [];
  yesNo: any[];
  compteInternes: ComptesInternes[];
  constructor(private factureService: FacturesService, private comptesinternesServices: ComptesInternesService, private dateAdapter: DateAdapter<Date>, private messageboxService: MessageboxService, private entrepriseUserinfos: EntrepriseUserInfosService, private articleService: ArticlesService, private demandeServices: DemandeService, private userServices: UserService, private fb: FormBuilder, public dialogRef: MatDialogRef<FacturesComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fact = new Factures();
    this.fact.id = 0;
    this.fact.tvaDeductible = YesNo.Oui;
    this.fact.montant = '0';
    this.dateAdapter.setLocale('fr');
    this.demande = this.data.demande;
    this.getFacture(this.demande.id);
    this.getUserInfo(this.demande.userId);
    this.getProductDetaile(this.demande.productId);
    this.getWorkFlow(this.demande.id);
    this.yesNo = enumSelector(YesNo);
  }



  getStatut(value) {
    return STATUT.find(e => e.value === value);

  }

  getComptesInternes() {
    this.comptesinternesServices.getComptesInternes().subscribe(
      res => {
        this.compteInternes = res;

      }
    );
  }

    ngOnInit() {

      this.getComptesInternes();
      this.creaform();


  }
  creaform() {
this.facturesForm = this.fb.group({
     libele: [this.fact.libele, Validators.required],
     dateOperation: [this.fact.dateOperation, Validators.required],
     refFacture: [this.fact.ref, Validators.required],
     fraitsTransports: [this.fact.fraitsTransports],
     comment: [''],
     ristoune: [this.fact.ristoune],
     TauxTva: [this.fact.tauxTva],
     tva: [this.fact.tva, Validators.required],
     comptesInternes: [this.fact.comptesInternesId, Validators.required],
     montant: [this.fact.montant, Validators.required],
     tvaDeductible: [this.fact.tvaDeductible, Validators.required],

});
this.facturesForm.get('tvaDeductible').valueChanges.subscribe(data => this.ontvaDeductible(data));
  }

  getFacture(damandeId) {
    this.factureService.getFacturesBydemandId(damandeId).subscribe(res => {
      console.log(res);
      this.fact = res != null ? res : this.fact;
      if (this.fact.id > 0) {
        this.actionLabel = 'Modifier';
        this.facturesForm.get('libele').setValue(this.fact.libele);
        this.facturesForm.get('refFacture').setValue(this.fact.ref);
        this.facturesForm.get('ristoune').setValue(this.fact.ristoune);
        this.facturesForm.get('TauxTva').setValue(this.fact.tauxTva);
        this.facturesForm.get('tva').setValue(this.fact.tva);
        this.facturesForm.get('comptesInternes').setValue(this.fact.comptesInternesId);
        this.facturesForm.get('montant').setValue(this.fact.montant);
        this.facturesForm.get('tvaDeductible').setValue(this.fact.tvaDeductible);
        this.facturesForm.get('fraitsTransports').setValue(this.fact.fraitsTransports);
        this.facturesForm.get('dateOperation').setValue(this.fact.dateOperation);
      //  this.facturesForm.get('').setValue(this.fact.libele);
      }
    });
  }
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
      const tvaControl = this.facturesForm.get('tva');
      console.log(data);
      if (data) {
             tvaControl.setValidators([Validators.required]);
      } else {
        tvaControl.setValidators([]);
      }

      tvaControl.updateValueAndValidity();
  }



  AddFacture () {
    const facture = new Factures();
    facture.id = this.fact.id;
     facture.dateOperation = this.facturesForm.get('dateOperation').value;
     facture.montant = this.facturesForm.get('montant').value;
     facture.tva = this.facturesForm.get('tva').value;
     facture.ref = this.facturesForm.get('refFacture').value;
     facture.demandesId = this.data.demande.id;
     facture.tvaDeductible = this.facturesForm.get('tvaDeductible').value;
     facture.libele = this.facturesForm.get('libele').value;
     facture.fraitsTransports = this.facturesForm.get('fraitsTransports').value;
     facture.ristoune = this.facturesForm.get('ristoune').value;
     facture.comptesInternesId = this.facturesForm.get('comptesInternes').value;


    // approbationWorkflow.globalStatut=3;

     this.messageboxService.ShowMessage('Avertissement', 'approuvrer cette demandes ?', '', 2, false, 1, '520px', 'info', 'primary').subscribe(
       res => {
         const r: any = res;
         if (r.result === 'yes') {
           if (this.fact.id > 0) {
            this.factureService.updateFactures(facture).subscribe(response => {
              console.log(response);
              this.messageboxService.ShowMessage('Information', ' Demande aprouvée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
              this.dialogRef.close({result: 1});
        });

           } else {
            this.factureService.addFactures(facture).subscribe(response => {
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
