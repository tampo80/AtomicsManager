import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../../../../../models/user.model';
import { FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { AccountService } from '../../../../../services/account.service';
import { UserEdit } from '../../../../../models/user-edit.model';
import { Role } from '../../../../../models/role.model';
import { MessageboxService } from '../../../../../services/messagebox.service';
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  roleformControl = new FormControl();
  roles:Role[]=[];
  roleList:string[]=[];
  //toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  
  private erroMessage:string;
  //formControl;

  constructor(private messageboxService:MessageboxService,public accountService:AccountService, public dialogRef: MatDialogRef<AddDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {

    data.user=new UserEdit();

    /*this.formControl = fb.group({
      jobTitle: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required,this.isEmailValid('email')]],
      phoneNumber: ['', Validators.required],
      fullName: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });*/
   }

  ngOnInit() {
    this.data.user.isEnabled=true;
    this.getRoles();
  }

   isEmailValid(control) {

    return control => {
  
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
      return regex.test(control.value) ? null : { invalidEmail: true };
  
    }
  
  }
  getRolelist(roles:Role[])
  {
    roles.forEach(g=>{
      this.roleList.push(g.name);
    })
  }
   getRoles() {
    this.accountService.getRoles().subscribe(
      response=>{
        this.roles=response;
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
      this.formControl.hasError('email') ? "Mail n'est pas valide" :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close({result:0});;
  }

  public confirmAdd(): void {
    console.log(this.data);
    this.erroMessage='';
   // let role:Role=new Role("administrator");
    //this.data.user.roles=['administrator'];
 
    console.log(this.data);
    this.accountService.addUser(this.data.user).subscribe(res=>{
     
      
     this.dialogRef.close({result:1});
      
    },
  err=>{
   
    if (err.statuts===400) {
      this.erroMessage=err.error;
      this.messageboxService.ShowMessage("Avertissement","des erreurs empechent l'enregistrement "+this.erroMessage,"",0,false,1,'520px',"warning",'warn')
    }
         
      }  
  );

  }
}
