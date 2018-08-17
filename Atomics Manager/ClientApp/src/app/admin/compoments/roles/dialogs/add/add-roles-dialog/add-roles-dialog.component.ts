import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountService } from '../../../../../services/account.service';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { Role } from '../../../../../models/role.model';
import { FormControl, Validators } from '@angular/forms';
import { Permission } from '../../../../../models/permission.model';

@Component({
  selector: 'app-add-roles-dialog',
  templateUrl: './add-roles-dialog.component.html',
  styleUrls: ['./add-roles-dialog.component.scss']
})

export class AddRolesDialogComponent implements OnInit {
  roleformControl = new FormControl();
  permissions: Permission[];
  private selectedValues: { [key: string]: boolean; } = {};
  constructor(private messageboxService: MessageboxService, public accountService: AccountService, public dialogRef: MatDialogRef<AddRolesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    data.role = new Role();

   }

  ngOnInit() {
    this.getPermissions();
  }

  private getPermissions() {
    this.accountService.getPermisions().subscribe(response => {
      console.log(response);
      this.permissions = response;
    });
  }


  submit() {
    // emppty stuff
    }

    onNoClick(): void {
      this.dialogRef.close({result: 0});
    }


    public selectAll() {
      this.permissions.forEach(p => this.selectedValues[p.value] = true);
  }


  public selectNone() {
      this.permissions.forEach(p => this.selectedValues[p.value] = false);
  }

  private getSelectedPermissions() {
    return this.permissions.filter(p => this.selectedValues[p.value] === true);
}

  addRole() {
    this.data.role.permissions = this.getSelectedPermissions();
    this.accountService.addRole(this.data.role).subscribe(

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

}
