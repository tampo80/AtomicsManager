import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../../node_modules/@angular/forms';
import { FormErrorStateMatcher } from '../../../../../formErrorStateMatcher/form-error-state-matcher';
import { Agences } from '../../../../../models/agences';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { AgencesService } from '../../../../../services/agences.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../../../node_modules/@angular/material';
import { PaysService } from '../../../../../services/pays.service';
import { VillesService } from '../../../../../services/villes.service';
import { Pays } from '../../../../../models/pays.model';
import { Villes } from '../../../../../models/villes';
import { EditAgences } from '../../../../../models/edit-agences';

@Component({
  selector: 'app-add-agences-dialog',
  templateUrl: './add-agences-dialog.component.html',
  styleUrls: ['./add-agences-dialog.component.scss']
})
export class AddAgencesDialogComponent implements OnInit {
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

  constructor(private messageboxService:MessageboxService,public agencesService:AgencesService,private paysServices:PaysService,private villesService:VillesService, private fb: FormBuilder,public dialogRef: MatDialogRef<AddAgencesDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    data.agences=new Agences();

  }

  ngOnInit() {

this.getPays();
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
      name:['',Validators.required],
      tel:['',Validators.required],
      adresse:['',Validators.required],
      pays:['',Validators.required],
      ville:['',Validators.required],

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

  this.agencesService.addAgences(agences).subscribe(

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
