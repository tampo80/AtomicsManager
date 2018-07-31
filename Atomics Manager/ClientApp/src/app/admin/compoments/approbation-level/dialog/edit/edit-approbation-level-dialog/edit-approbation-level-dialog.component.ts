import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../../node_modules/@angular/forms';
import { FormErrorStateMatcher } from '../../../../../formErrorStateMatcher/form-error-state-matcher';
import { TypeApprovalGroup } from '../../../../../models/type-approval-group';
import { TYPE_APPROVAL_GROUP } from '../../../../../config';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { ApprobationLevel } from '../../../../../models/approbation-level';
import { ApprobationLevelService } from '../../../../../services/approbation-level.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../../../node_modules/@angular/material';


@Component({
  selector: 'app-edit-approbation-level-dialog',
  templateUrl: './edit-approbation-level-dialog.component.html',
  styleUrls: ['./edit-approbation-level-dialog.component.scss']
})
export class EditApprobationLevelDialogComponent implements OnInit {

  isVillesLoading=false;

  ApprobationLevelForm:FormGroup;
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

  lesNiveaux=[
    1,2,3,4,5,6,7,8,9
  ];
  matcher = new FormErrorStateMatcher();
  typeApproval:TypeApprovalGroup[]=TYPE_APPROVAL_GROUP;
  constructor(private messageboxService:MessageboxService,public approbationLevelService:ApprobationLevelService, private fb: FormBuilder,public dialogRef: MatDialogRef<EditApprobationLevelDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
   // data.approbationLevel=new ApprobationLevel();

  }

  ngOnInit() {


this.createForm();
this.onValueChanged();

  }




createForm()
{
  this.ApprobationLevelForm=this.fb.group(
    {
      name:[ this.data.approbationLevel.name,Validators.required],
      expensLimite:[ this.data.approbationLevel.expensLimite,Validators.required],
      level:[ this.data.approbationLevel.level,Validators.required],
      typeApprovalGroup:[ this.data.approbationLevel.typeApprovalGroup,Validators.required],

    });

    this.ApprobationLevelForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
}
 onNoClick(): void {
  this.dialogRef.close({result:0});;
}

onSubmit() {
  //  alert("p");
  let approbationLevel:ApprobationLevel=new ApprobationLevel();

 approbationLevel.id=this.data.approbationLevel.id;
  approbationLevel.name=this.ApprobationLevelForm.get('name').value;
  approbationLevel.level=this.ApprobationLevelForm.get('level').value;
  approbationLevel.expensLimite=this.ApprobationLevelForm.get('expensLimite').value;
  approbationLevel.typeApprovalGroup=this.ApprobationLevelForm.get('typeApprovalGroup').value;


  this.approbationLevelService.updateApprobationLevel(approbationLevel).subscribe(

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
