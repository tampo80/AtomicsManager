import { Component, OnInit, Inject } from '@angular/core';
import { MessageboxService } from '../../../../services/messagebox.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '../../../../../../../node_modules/@angular/material';
import { AccountService } from '../../../../services/account.service';
import { FormBuilder, FormGroup, Validators } from '../../../../../../../node_modules/@angular/forms';
import { DepartementsService } from '../../../../services/departements.service';
import { ServicesService } from '../../../../services/services.service';
import { Departements } from '../../../../models/departements';
import { Services} from '../../../../models/services';
import { Agences } from '../../../../models/agences';
import { AgencesService } from '../../../../services/agences.service';
import { EntrepriseService } from '../../../../services/entreprise.service';
import { EntrepriseUserInfosService } from '../../../../services/entreprise-user-infos.service';
import { EntrepriseUserInfos } from '../../../../models/entreprise-user-infos';
import { userInfo } from 'os';

@Component({
  selector: 'app-set-user-position',
  templateUrl: './set-user-position.component.html',
  styleUrls: ['./set-user-position.component.scss']
})
export class SetUserPositionComponent implements OnInit {

   setUserFrom:FormGroup;
   lesServcies:Services[];
   lesDepartements:Departements[];
   lesAgences:Agences[];
   isLoading:boolean;
   idUserInfos:number=0;
  constructor(private snackBar:MatSnackBar, private entrepriseUserInfosServices:EntrepriseUserInfosService, private agencesServices:AgencesService, private departementService:DepartementsService,private serviceServices:ServicesService, private fb:FormBuilder, private messageboxService:MessageboxService,public accountService:AccountService, public dialogRef: MatDialogRef<SetUserPositionComponent>,@Inject(MAT_DIALOG_DATA) public data: any)
  {
     this.isLoading=true;
      this.getDepartements();
      this.getAgences();
      this.getEntreprise(data.user.id);
      this.createFrom();

  }

  getEntreprise(userId:string)
  {
    this.entrepriseUserInfosServices.getEntrepriseUserInfosByUserId(userId).subscribe(
      res=>{
        if (res!=null) {
          console.log(res);
          this.setUserFrom.get('departements').setValue(res.departementsId);
          this.getServicesByDepartementId(res.departementsId);
          this.setUserFrom.get('agence').setValue(res.agencesId);
          this.setUserFrom.get('service').setValue(res.servicesId);

          this.setUserFrom.get('id').setValue(res.id);
          this.idUserInfos=res.id;
        }

      }
    );
  }



  onNoClick(): void {
    this.dialogRef.close({result:0});;
  }
  createFrom()
  {
    this.setUserFrom=this.fb.group({
      id:[this.idUserInfos],
      applicationUserId:[this.data.user.id,Validators.required],
      agence:['',Validators.required],
      service:['',Validators.required],
      departements:['',Validators.required]

    })

  }


getAgences()
 {
   this.agencesServices.getAgences().subscribe(res=>{
    this.lesAgences=res;
    this.isLoading=false;
   });
 }
getDepartements()
{
  this.departementService.getDepartements().subscribe(res=>{
    this.lesDepartements=res;
  });
}

getServicesByDepartementId(Id:number)
 {
   this.isLoading=true;
   this.serviceServices.getServicesByDepartementsId(Id).subscribe(res=>{
    this.lesServcies=res;
    this.isLoading=false;
   });
 }

  ngOnInit() {
console.log(this.lesDepartements);
  }


  onSubmit() {
console.log(this.idUserInfos);
let userInfos:EntrepriseUserInfos;
     userInfos=new EntrepriseUserInfos();

      userInfos.agencesId=this.setUserFrom.get('agence').value;
      userInfos.departementsId=this.setUserFrom.get('departements').value;
      userInfos.servicesId=this.setUserFrom.get('service').value;
      userInfos.applicationUserId=this.setUserFrom.get('applicationUserId').value;
      userInfos.id=this.setUserFrom.get('id').value;
    if (this.idUserInfos==0) {



      this.entrepriseUserInfosServices.addEntrepriseUserInfos(userInfos).subscribe(res=>{

         this.dialogRef.close({result:1});

      });
    }
    else{
    this.entrepriseUserInfosServices.updateEntrepriseUserInfos(userInfos).subscribe(res=>{
         this.dialogRef.close({result:1});
    });
    }
  }

}
