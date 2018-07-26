import { Component, OnInit, Inject } from '@angular/core';
import { FormErrorStateMatcher } from '../../../../../formErrorStateMatcher/form-error-state-matcher';
import { Pays } from '../../../../../models/pays.model';
import { Villes } from '../../../../../models/villes';
import { FormGroup, Validators, FormBuilder } from '../../../../../../../../node_modules/@angular/forms';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { AgencesService } from '../../../../../services/agences.service';
import { PaysService } from '../../../../../services/pays.service';
import { VillesService } from '../../../../../services/villes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../../../node_modules/@angular/material';
import { EditAgences } from '../../../../../models/edit-agences';
import { Agences } from '../../../../../models/agences';

@Component({
  selector: 'app-edit-agences-dialog',
  templateUrl: './edit-agences-dialog.component.html',
  styleUrls: ['./edit-agences-dialog.component.scss']
})
export class EditAgencesDialogComponent implements OnInit {
  isVillesLoading=false;
  lesPays:Pays[];
  villesParPays:Villes[];
  AgencesForm:FormGroup;
  validationMessages = {

    name: {
      required: 'Ce champ ne peu pas pas étre vide !',

    },
    pays: {
      required: 'Ce champ ne peu pas pas étre vide !',

    },
    tel: {
      required: 'Ce champ ne peu pas pas étre vide !',

    },
    adresse: {
      required: 'Ce champ ne peu pas pas étre vide !',

    },
    ville: {
      required: 'Ce champ ne peu pas pas étre vide !',

    }
  };
  formErrors = {

    name: '',
    tel:'',
    adresse:'',
    pays:'',
    ville:''

  };
  matcher = new FormErrorStateMatcher();

  constructor(private messageboxService:MessageboxService,public agencesService:AgencesService,private paysServices:PaysService,private villesService:VillesService, private fb: FormBuilder,public dialogRef: MatDialogRef<EditAgencesDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
   // data.agences=new Agences();

  }

  ngOnInit() {

this.getPays();
this.getVillesByPaysId(this.data.agences.paysId);
this.createForm();
this.onValueChanged();
  }

  getPays()
  {
    this.paysServices.getPays().subscribe(
      res=>{
        this.lesPays=res;
      }
    );
  }

 getVillesByPaysId(id?:number)
 {this.isVillesLoading=true;
    this.villesService.getVillesByPaysId(id).subscribe(
      res=>{
        this.villesParPays=res;
        this.isVillesLoading=false;
      }
    );
 }

createForm()
{
  this.AgencesForm=this.fb.group(
    {
      name:[this.data.agences.name,Validators.required],
      tel:[this.data.agences.tel,Validators.required],
      adresse:[this.data.agences.adresse,Validators.required],
      pays:[this.data.agences.paysId,Validators.required],
      ville:[this.data.agences.villesId,Validators.required],

    });

    this.AgencesForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
}
 onNoClick(): void {
  this.dialogRef.close({result:0});;
}

onSubmit() {
  //  alert("p");
  let agences:EditAgences=new EditAgences();

  agences.adresse=this.AgencesForm.get('adresse').value;
  agences.name=this.AgencesForm.get('name').value;
  agences.villesId=this.AgencesForm.get('ville').value;
  agences.tel= this.AgencesForm.get('tel').value;
  agences.id=this.data.agences.id;
  this.agencesService.updateAgences(agences).subscribe(

    res=>{


      this.dialogRef.close({result:1});

     },
   err=>{

     if (err.statuts===400) {
      // this.erroMessage=err.error;
       this.messageboxService.ShowMessage("Avertissement","des erreurs empechent l'enregistrement "+err.error,"",0,false,1,'520px',"warning",'warn')
     }

       }
  );
   }




   onValueChanged(data?: any) {
    if (!this.createForm) {
      return;
    }
    const form = this.AgencesForm;
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
