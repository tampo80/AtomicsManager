import { Component, OnInit, Inject } from '@angular/core';
import { Demandes } from '../../../models/demandes';
import { DemandeService } from '../../../services/demande.service';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '../../../../../../node_modules/@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../node_modules/@angular/material';
import { STATUT } from '../../../config';
import { ArticlesService } from '../../../services/articles.service';
import { Articles } from '../../../models/articles';
import { EntrepriseUserInfosService } from '../../../services/entreprise-user-infos.service';
import { EntrepriseUserInfos } from '../../../models/entreprise-user-infos';

@Component({
  selector: 'app-detail-owndemandes',
  templateUrl: './detail-owndemandes.component.html',
  styleUrls: ['./detail-owndemandes.component.scss']
})
export class DetailOwndemandesComponent implements OnInit {
  statut=STATUT;

  demande:Demandes=new Demandes();
  productDetails:Articles=new Articles();
  demadeForm:FormGroup;
  isLoading:boolean=true;
  userInfo:EntrepriseUserInfos=new EntrepriseUserInfos();
  constructor(private entrepriseUserinfos:EntrepriseUserInfosService, private articleService:ArticlesService, private demandeServices:DemandeService, private userServices:UserService, private fb:FormBuilder, public dialogRef: MatDialogRef<DetailOwndemandesComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {

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

}
