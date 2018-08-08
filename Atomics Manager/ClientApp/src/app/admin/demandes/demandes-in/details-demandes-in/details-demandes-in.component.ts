import { Component, OnInit, Inject } from '@angular/core';
import { STATUT } from '../../../config';
import { Demandes } from '../../../models/demandes';
import { Articles } from '../../../models/articles';
import { FormGroup, FormBuilder, Validators } from '../../../../../../node_modules/@angular/forms';
import { EntrepriseUserInfos } from '../../../models/entreprise-user-infos';
import { ApprobationWorkflowService } from '../../../services/approbation-workflow.service';
import { MessageboxService } from '../../../services/messagebox.service';
import { EntrepriseUserInfosService } from '../../../services/entreprise-user-infos.service';
import { ArticlesService } from '../../../services/articles.service';
import { DemandeService } from '../../../services/demande.service';
import { UserService } from '../../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../node_modules/@angular/material';
import { ApprobationWorkflow } from '../../../models/approbation-workflow';

@Component({
  selector: 'app-details-demandes-in',
  templateUrl: './details-demandes-in.component.html',
  styleUrls: ['./details-demandes-in.component.scss']
})
export class DetailsDemandesInComponent implements OnInit {

  statut=STATUT;

  demande:Demandes=new Demandes();
  productDetails:Articles=new Articles();
  demadeForm:FormGroup;
  isLoading:boolean=true;
  userInfo:EntrepriseUserInfos=new EntrepriseUserInfos();
  constructor(private approbationWorkflowService:ApprobationWorkflowService, private messageboxService:MessageboxService, private entrepriseUserinfos:EntrepriseUserInfosService, private articleService:ArticlesService, private demandeServices:DemandeService, private userServices:UserService, private fb:FormBuilder, public dialogRef: MatDialogRef<DetailsDemandesInComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {

    this.demande=this.data.demande;
    this.getUserInfo(this.demande.userId);
    this.getProductDetaile(this.demande.productId);
  }

  getStatut(value)
  {
    return STATUT.find(e=>e.value==value).label;

  }

  ngOnInit() {
this.creaform();
  }
  creaform()
  {
this.demadeForm=this.fb.group({
   comment:['',Validators.required]
});
  }
  onNoClick(): void {
    this.dialogRef.close({result:0});;
  }

  getUserInfo(id)
  {
    this.entrepriseUserinfos.getEntrepriseUserInfosByUserId(id).subscribe(res=>{
      this.userInfo=res;
      console.log(res);
    }

    )
  }

  getProductDetaile(id)
  {
   this.articleService.getArticlesById(id).subscribe(res=>{
        this.productDetails=res;
        this.isLoading=false;
        console.log(res);
   });
  }

  cancelDemande(){
    let approbationWorkflow:ApprobationWorkflow=new ApprobationWorkflow();
    approbationWorkflow.approbationDate=new Date;
    approbationWorkflow.comment=this.demadeForm.get('comment').value;
    approbationWorkflow.demandesId=this.demande.id;
    approbationWorkflow.levelStatut=3;
    approbationWorkflow.globalStatut=3;

    this.messageboxService.ShowMessage("Avertissement","Annuler  la demandes ?","",2,false,1,'520px',"warning",'warn').subscribe(
      res=>{
        let r:any=res;
        if (r.result=="yes")
        {
          this.approbationWorkflowService.addApprobationWorkflow(approbationWorkflow).subscribe(res=>{
                console.log(res);
                this.messageboxService.ShowMessage("Information"," annulé avec succès",'',0,false,1,'500px',"info",'primary');
                this.dialogRef.close({result:1});;
          });

        }
      }
    );
  }



}
