import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PasswordValidation } from '../../../../validators/password-validation';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
 passwordPatern:string='(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}';
  editPassForm:FormGroup;
  validationMessages = {
    currentPassword: {
      required: 'Ce champ ne peu pas pas étre vide !',
      pattern: 'Le mot de passe doit contenir au moins un caractère majuscule, un caractère numérique et un caractère spéciale',
      minlength: 'Le mot de passe doit contenir au moins 6 caractères ',
      maxlength: 'Le mot de passe doit contenir au plus 25 caractères '
    },
    newPassword: {
      required: 'Ce champ ne peu pas pas étre vide !',
      pattern: 'Le mot de passe doit contenir au moins un caractère majuscule, un caractère numérique et un caractère spéciale',
      minlength: 'Le mot de passe doit contenir au moins 6 caractères ',
      maxlength: 'Le mot de passe doit contenir au plus 25 caractères '
    },
    confirmPassword: {
      required: 'Ce champ ne peu pas pas étre vide !',
      pattern: 'Le mot de passe doit contenir au moins un charatere majuscule,un caratere numérique et un charatere spéciale',
      minlength: 'Le mot de passe doit contenir au moins 6 caractères ',
      maxlength: 'Le mot de passe doit contenir au plus 25 caractères ',
      MatchPassword:"Les mots de passe sont differents !"
    }
  };
  formErrors = {
    currentPassword: '',
    newPassword: '',
    confirmPassword:''
  };
  constructor(private accountService:AccountService, private fb: FormBuilder,public dialogRef: MatDialogRef<EditPasswordComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close({result:0});
  }
  createForm(){
    this.editPassForm=this.fb.group({
     id:[this.data.user.id,Validators.required],
     currentPassword: ['',[Validators.required,Validators.minLength(6)]],
     newPassword: ['',[Validators.required,Validators.minLength(6),Validators.pattern(this.passwordPatern),Validators.maxLength(25)]],
     confirmPassword: ['',[Validators.required,Validators.minLength(6),Validators.pattern(this.passwordPatern),Validators.maxLength(25)]]
    },
    {

      validator:PasswordValidation.MatchPassword

    });
    this.editPassForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }


  onSubmit()
  {
    if(!this.editPassForm.invalid)
    {
      this.data.user.currentPassword=this.editPassForm.get('currentPassword').value;
      this.data.user.newPassword=this.editPassForm.get('newPassword').value;
      this.data.user.confirmPassword=this.editPassForm.get('newPassword').value;
     this.accountService.updateMe(this.data.user).subscribe(
         res=>{
          this.dialogRef.close({result:1});
         }
     );
    }
  }

  onValueChanged(data?: any) {
    if (!this.createForm) {
      return;
    }
    const form = this.editPassForm;
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
