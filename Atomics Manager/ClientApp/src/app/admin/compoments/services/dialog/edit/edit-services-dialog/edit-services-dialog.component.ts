import { Component, OnInit, Inject } from '@angular/core';
import { Departements } from '../../../../../models/departements';
import { FormGroup, Validators, FormBuilder } from '../../../../../../../../node_modules/@angular/forms';
import { Services } from '../../../../../models/services';
import { FormErrorStateMatcher } from '../../../../../formErrorStateMatcher/form-error-state-matcher';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { ServicesService } from '../../../../../services/services.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '../../../../../../../../node_modules/@angular/material';
import { DepartementsService } from '../../../../../services/departements.service';

@Component({
  selector: 'app-edit-services-dialog',
  templateUrl: './edit-services-dialog.component.html',
  styleUrls: ['./edit-services-dialog.component.scss']
})
export class EditServicesDialogComponent implements OnInit  {
  isVillesLoading=false;
  lesDepartements:Departements[];
  ServicesForm:FormGroup;
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

  constructor(private messageboxService:MessageboxService,public servicesService:ServicesService,private departementsServices:DepartementsService, private fb: FormBuilder,public dialogRef: MatDialogRef<EditServicesDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    //data.services=new Services();

  }

  ngOnInit() {


this.createForm();
this.onValueChanged();
this.getDepatement();
  }


  getDepatement()
  {
    this.departementsServices.getDepartements().subscribe(res=>{
        this.lesDepartements=res;
    })
  }

createForm()
{
  this.ServicesForm=this.fb.group(
    {
      name:[this.data.services.name,Validators.required],
      description:[this.data.services.description,Validators.required],
      departements:[this.data.services.departementsId,Validators.required],


    });

    this.ServicesForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
}
 onNoClick(): void {
  this.dialogRef.close({result:0});;
}

onSubmit() {
  //  alert("p");
  let services:Services=new Services();

  services.departementsId=this.ServicesForm.get('departements').value;
  services.name=this.ServicesForm.get('name').value;
  services.description=this.ServicesForm.get('description').value;
  services.id=this.data.services.id;

  this.servicesService.updateServices(services).subscribe(

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
    const form = this.ServicesForm;
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
