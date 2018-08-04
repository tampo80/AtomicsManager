import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';
import { FormBuilder, FormGroup, Validators } from '../../../../../node_modules/@angular/forms';
import { FormErrorStateMatcher } from '../../formErrorStateMatcher/form-error-state-matcher';
import { Demandes } from '../../models/demandes';
import { UserService } from '../../services/user.service';
import { DemandeService } from '../../services/demande.service';

@Component({
  selector: 'app-ini-demande',
  templateUrl: './ini-demande.component.html',
  styleUrls: ['./ini-demande.component.scss']
})
export class IniDemandeComponent implements OnInit {

  demandeForm:FormGroup;
  validationMessages = {

    name: {
      required: 'Ce champ ne peu pas pas étre vide !',

    },
    departements: {
      required: 'Ce champ ne peu pas pas étre vide !',

    },
    description: {
      required: 'Ce champ ne peu pas pas étre vide !',

    }
  };
  formErrors = {

    name: '',
    departements:'',
    description:'',


  };
  matcher = new FormErrorStateMatcher();

  demande:Demandes=new Demandes();
  constructor(private demandeServices:DemandeService, private userServices:UserService, private fb:FormBuilder, public dialogRef: MatDialogRef<IniDemandeComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {


  }

  ngOnInit() {
    this.createForm();
    this.demande.dateDemande=new Date();
    this.demande.fournisseursId=this.data.articles.fournisseursId;
    this.demande.montant=this.data.articles.buyingPrice;
    this.demande.motif=this.demandeForm.get('motif').value;
    this.demande.nature = 0;
    this.demande.productId = this.data.articles.id;
    this.demande.quantite=this.demandeForm.get('quantite').value;
    this.demande.userId = this.userServices.currentUser.id;
  }

  createForm()
  {
    this.demandeForm=this.fb.group({
       motif:['',Validators.required],
       quantite:[1,Validators.required]
    });
    this.demandeForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    this.demandeForm.get('quantite').valueChanges.subscribe(value=>{
      this.demande.montant=value*this.data.articles.buyingPrice;
    });
  }

  onNoClick(): void {
    this.dialogRef.close({result:0});;
  }

  createDemande()
  {

  this.demande.dateDemande=new Date();
  this.demande.fournisseursId=this.data.articles.fournisseursId;

  this.demande.motif=this.demandeForm.get('motif').value;
  this.demande.nature = 0;
  this.demande.productId = this.data.articles.id;
  this.demande.quantite=this.demandeForm.get('quantite').value;
  this.demande.userId = this.userServices.currentUser.id;
    this.demandeServices.addDemandes(this.demande).subscribe(res => {
      this.dialogRef.close({result:1});
    });

  }

  onValueChanged(data?: any) {
    if (!this.createForm) {
      return;
    }
    const form = this.demandeForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
