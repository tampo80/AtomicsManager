import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Departements } from '../../../../../models/departements';
import { DepartementsService } from '../../../../../services/departements.service';
import { FormErrorStateMatcher } from '../../../../../formErrorStateMatcher/form-error-state-matcher';

@Component({
  selector: 'app-add-departements',
  templateUrl: './add-departements.component.html',
  styleUrls: ['./add-departements.component.scss']
})
export class AddDepartementsComponent implements OnInit {

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
    description: ''
  };
  matcher = new FormErrorStateMatcher();

  constructor(private messageboxService: MessageboxService, public departementsService: DepartementsService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddDepartementsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    data.departements = new Departements();

  }

  ngOnInit() {


this.createForm();
this.onValueChanged();
  }



createForm() {
  this.DepartementsForm = this.fb.group(
    {
      name: ['', Validators.required],
      description: ['', Validators.required]

    });

    this.DepartementsForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
}
 onNoClick(): void {
  this.dialogRef.close({result: 0});
}

onSubmit() {
  //  alert("p");
  this.departementsService.addDepartements(this.DepartementsForm.value).subscribe(

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
