import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Permission } from '../../../../../models/permission.model';
import { AccountService } from '../../../../../services/account.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageboxService } from '../../../../../services/messagebox.service';

@Component({
  selector: 'app-edit-roles-dialog',
  templateUrl: './edit-roles-dialog.component.html',
  styleUrls: ['./edit-roles-dialog.component.scss']
})
export class EditRolesDialogComponent implements OnInit {
  roleformControl = new FormControl();
  permissions:Permission[];
  private selectedValues: { [key: string]: boolean; } = {};
  constructor(private messageboxService:MessageboxService,public accountService:AccountService, public dialogRef: MatDialogRef<EditRolesDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.getPermissions();
    this.data.role.permissions.forEach(p => this.selectedValues[p.value] = true);
  }

  private getPermissions() {
    this.accountService.getPermisions().subscribe(response => {
      console.log(response);
      this.permissions = response;
    });
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Champ réquis' :
      this.formControl.hasError('email') ? "Mail n'est pas valide" :
        '';
  }
  submit() {
    // emppty stuff
    }
  
    onNoClick(): void {
      this.dialogRef.close({result:0});;
    }
    formControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);


    private selectAll() {
      this.permissions.forEach(p => this.selectedValues[p.value] = true);
  }


  private selectNone() {
      this.permissions.forEach(p => this.selectedValues[p.value] = false);
  }

  private getSelectedPermissions() {
    return this.permissions.filter(p => this.selectedValues[p.value] == true);
}

  editRole()
  {
    this.data.role.permissions=this.getSelectedPermissions();
    this.accountService.editRole(this.data.role).subscribe(

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
   
}
