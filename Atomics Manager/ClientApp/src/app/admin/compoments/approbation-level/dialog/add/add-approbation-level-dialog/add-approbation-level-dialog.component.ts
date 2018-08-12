import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../../node_modules/@angular/forms';
import { FormErrorStateMatcher } from '../../../../../formErrorStateMatcher/form-error-state-matcher';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { ApprobationLevel } from '../../../../../models/approbation-level';
import { ApprobationLevelService } from '../../../../../services/approbation-level.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '../../../../../../../../node_modules/@angular/material';
import { TypeApprovalGroup } from '../../../../../models/type-approval-group';
import { TYPE_APPROVAL_GROUP } from '../../../../../config';

@Component({
  selector: 'app-add-approbation-level-dialog',
  templateUrl: './add-approbation-level-dialog.component.html',
  styleUrls: ['./add-approbation-level-dialog.component.scss']
})
export class AddApprobationLevelDialogComponent implements OnInit {

   isVillesLoading = false;

  ApprobationLevelForm: FormGroup;
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
    departements: '',
    description: '',


  };

  lesNiveaux = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  ];

  nbrs = [1, 2, 3, 4];
  matcher = new FormErrorStateMatcher();
  typeApproval: TypeApprovalGroup[] = TYPE_APPROVAL_GROUP;
  // tslint:disable-next-line:max-line-length
  constructor(private messageboxService: MessageboxService, public approbationLevelService: ApprobationLevelService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddApprobationLevelDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    data.approbationLevel = new ApprobationLevel();

  }

  ngOnInit() {


this.createForm();
this.onValueChanged();

  }




createForm() {
  this.ApprobationLevelForm = this.fb.group(
    {
      name: ['', Validators.required],
      expensLimite: ['', Validators.required],
      level: [0, Validators.required],
      typeApprovalGroup: ['', Validators.required],
      shared: [false, Validators.required],
      numberApprobaionRequiered: [1, Validators.required]

    });

    this.ApprobationLevelForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
}
 onNoClick(): void {
  this.dialogRef.close({result: 0});
}

onSubmit() {
  //  alert("p");
  const approbationLevel: ApprobationLevel = new ApprobationLevel();


  approbationLevel.name = this.ApprobationLevelForm.get('name').value;
  approbationLevel.level = this.ApprobationLevelForm.get('level').value;
  approbationLevel.expensLimite = this.ApprobationLevelForm.get('expensLimite').value;
  approbationLevel.typeApprovalGroup = this.ApprobationLevelForm.get('typeApprovalGroup').value;
  approbationLevel.shared = this.ApprobationLevelForm.get('shared').value;
  approbationLevel.numberApprovalRequiered = this.ApprobationLevelForm.get('numberApprobaionRequiered').value;
  this.approbationLevelService.addApprobationLevel(approbationLevel).subscribe(

    res => {


      this.dialogRef.close({result: 1});

     },
   err => {

     if (err.statuts === 400) {
      // this.erroMessage=err.error;
       this.messageboxService
       .ShowMessage('Avertissement', 'des erreurs empechent l\'enregistrement ' + err.error, '', 0, false, 1, '520px', 'warning', 'warn');
     }

       }
  );
   }




   onValueChanged(data?: any) {
    if (!this.createForm) {
      return;
    }
    const form = this.ApprobationLevelForm;
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
