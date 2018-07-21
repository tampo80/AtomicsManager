import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup, Validators } from '../../../../../node_modules/@angular/forms';
import { fbind } from '../../../../../node_modules/@types/q';
import { UserEdit } from '../../models/user-edit.model';
import { DbKeyService } from '../../services/db-key.service';
import { Role } from '../../models/role.model';
import { MatSnackBar, MatDialog } from '../../../../../node_modules/@angular/material';
import { EditPasswordComponent } from './dialogs/edit-password/edit-password.component';
import { error } from '../../../../../node_modules/protractor';
import { GlobalErrorInterceptor } from '../../interceptors/global-error.interceptor';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   formuserProfile:FormGroup;
   me:UserEdit=new UserEdit();
   //private handleError: GlobalErrorInterceptor;
   lesRoles:Role[];
  constructor(public userService:UserService, private accountservice:AccountService,private fb:FormBuilder,public snackBar:MatSnackBar,private dialog: MatDialog) {
    this.getMe();
    this.getRoles();
    this.createForm();
    //this.handleError=new GlobalErrorInterceptor()

   }

  ngOnInit() {

  }
createForm()
{
  this.formuserProfile=this.fb.group(
    {

      id:[this.me.id,Validators.required],
      jobTitle:[this.me.jobTitle,Validators.required],
      userName:[this.me.userName,Validators.required],
      email:[this.me.email,[Validators.required,Validators.email]],
      phoneNumber:[this.me.phoneNumber,Validators.required],
      fullName:[this.me.fullName,Validators.required],
      roles:[{value: this.me.roles, disabled: true},Validators.required],
    }
  );



}
 getMe()
  {
    this.accountservice.getUserMe().subscribe(
      res=>{
        this.me=res;
        this.formuserProfile.get("id").setValue(res.id);
        this.formuserProfile.get("jobTitle").setValue(res.jobTitle);
        this.formuserProfile.get("userName").setValue(res.userName);
        this.formuserProfile.get("email").setValue(res.email);
        this.formuserProfile.get("phoneNumber").setValue(res.phoneNumber);
        this.formuserProfile.get("fullName").setValue(res.fullName);
        this.formuserProfile.get("roles").setValue(res.roles);
        console.log(this.me.jobTitle);
      }
    );

  }
  getRoles()
  {
    this.accountservice.getRoles().subscribe(res=>{
      this.lesRoles=res;
    });
  }
  onSubmit()
  {

    this.me.id= this.formuserProfile.get("id").value;
    this.me.jobTitle= this.formuserProfile.get("jobTitle").value;
    this.me.userName= this.formuserProfile.get("userName").value;
    this.me.email= this.formuserProfile.get("email").value;
    this.me.phoneNumber= this.formuserProfile.get("phoneNumber").value;
    this.me.fullName= this.formuserProfile.get("fullName").value;



    this.accountservice.updateMe( this.me).subscribe(
res=>{console.log(res);
           localStorage.setItem(DbKeyService.CURRENT_USER,JSON.stringify(this.me));
           this.snackBar.open("Modifications appliquées avec succès !","Modification du profil",{
             duration:2000,

           });
      }
    );
  }
  compareIds(id1:any, id2:any):boolean{
    const a1=determineId(id1);
    const a2=determineId(id2);
    return a1===a2;
  }

compareRoles=(role1:string,role2:string)=>role1==role2;


EditPassword(){

  const dialogRef = this.dialog.open(EditPasswordComponent,{
    data:{user:this.me},
   width:'600px',
   disableClose:true
  });

  dialogRef.afterClosed().subscribe(res=>{
    if (res.result===1) {
      this.snackBar.open("Mot de passe changé  avec succès !","Changement du mot de passe",{
        duration:2000,

      });
      ///this.messageboxService.ShowMessage("Information"," modification éffectuée avec succès",devises.label,0,false,1,'500px',"info",'primary');
    }
  }


  );
}

}
export function determineId(id:any):string {
    if (id.constructor.name=='array' && id.length>0) {
      return ''+id[0];
    }
    return ''+ id;
}
