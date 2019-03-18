import { Component, OnInit, Inject } from '@angular/core';
import { FormErrorStateMatcher } from '../../../../../formErrorStateMatcher/form-error-state-matcher';
import { Departements } from '../../../../../models/departements';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { DepartementsService } from '../../../../../services/departements.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-departements',
  templateUrl: './edit-departements.component.html',
  styleUrls: ['./edit-departements.component.scss']
})
export class EditDepartementsComponent implements OnInit {


  DepartementsForm: FormGroup;
  validationMessages = {

    name: {
      required: 'Ce champ ne peu pas pas étre vide !',

    },
    description: {
      required: 'Ce champ ne peu pas pas étre vide !',

    }
  };
  formErrors = {

    name: '',
    description: '',
    budjetCapex: '',
    budjetOpex: ''
  };
  matcher = new FormErrorStateMatcher();

  constructor(private messageboxService: MessageboxService, public departementsService: DepartementsService, private fb: FormBuilder, public dialogRef: MatDialogRef<EditDepartementsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    console.log(this.data);
  }

  ngOnInit() {


this.createForm();
this.onValueChanged();
  }



createForm() {
  console.log(this.data);
  this.DepartementsForm = this.fb.group(
    {
      id: [this.data.departements.id, Validators.required],
      name: [this.data.departements.name, Validators.required],
      description: [this.data.departements.description, Validators.required],
      budjetOpex: [this.data.departements.budjetOpex  , Validators.required],
      budjetCapex: [this.data.departements.budjetCapex, Validators.required]

    });

    this.DepartementsForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
}
 onNoClick(): void {
  this.dialogRef.close({result: 0});
}

onSubmit() {
  //  alert("p");
  this.departementsService.updateDepartements(this.DepartementsForm.value).subscribe(

    res =>  {


      this.dialogRef.close({result: 1});

     },
   err =>  {

     if (err.statuts === 400) {
      // this.erroMessage=err.error;
       this.messageboxService.ShowMessage('Avertissement', 'des erreurs empechent l\'enregistrement ' + err.error, '', 0, false, 1, '520px', 'warning', 'warn');
     }

       }
  );
   }




   onValueChanged(data?: any) {
    if (!this.createForm) {
      return;
    }
    const form = this.DepartementsForm;
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
