import { Component, OnInit, Inject } from '@angular/core';
import { AccountService } from '../../../../../services/account.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserEdit } from '../../../../../models/user-edit.model';
import { FormControl, Validators, FormBuilder, FormGroup, NgForm} from '@angular/forms';
import { Role } from '../../../../../models/role.model';
import { MessageboxService } from '../../../../../services/messagebox.service';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  user: UserEdit;
  constructor(private messageboxService: MessageboxService, public accountService: AccountService, public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.user = data.user;
    this.user.configuration = '';
    console.log(this.user);

   }
   roleformControl = new FormControl();
   roles: Role[] = [];
   roleList: string[] = [];
   // toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

   private erroMessage: string;

  ngOnInit() {
    this.getRoles();

  }

  isEmailValid(control) {

    return control => {

      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return regex.test(control.value) ? null : { invalidEmail: true };

    };

  }
  getRolelist(roles: Role[]) {
    roles.forEach(g =>  {
      this.roleList.push(g.name);
    });
  }
   getRoles() {
    this.accountService.getRoles().subscribe(
      response =>  {
        this.roles = response;
        this.getRolelist(this.roles);
      }
    );
  }

   formControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Champ réquis' :
      this.formControl.hasError('email') ? 'Mail n\'est pas valide' :
        '';
  }


  submit() {
    // emppty stuff
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    public confirmEdit(): void {
      console.log(this.data);
      this.erroMessage = '';
     // let role:Role=new Role("administrator");
      // this.data.user.roles=['administrator'];
      // this.data.user.isEnabled=true;
      console.log(this.data);
      this.accountService.updateUser(this.data.user).subscribe(res =>  {


       this.dialogRef.close({result: 1});

      },
    err =>  {

      if (err.statuts === 400) {
        this.erroMessage = err.error;
        this.messageboxService.ShowMessage('Avertissement', 'des erreurs empechent l\'enregistrement ' + this.erroMessage, '', 0, false, 1, '520px', 'warning', 'warn');
      }

        }
    );
  }

}
