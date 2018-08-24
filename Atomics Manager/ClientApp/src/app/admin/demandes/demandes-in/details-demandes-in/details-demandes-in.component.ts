import { Component, OnInit, Inject } from '@angular/core';
import { STATUT } from '../../../config';
import { Demandes } from '../../../models/demandes';
import { Articles } from '../../../models/articles';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntrepriseUserInfos } from '../../../models/entreprise-user-infos';
import { ApprobationWorkflowService } from '../../../services/approbation-workflow.service';
import { MessageboxService } from '../../../services/messagebox.service';
import { EntrepriseUserInfosService } from '../../../services/entreprise-user-infos.service';
import { ArticlesService } from '../../../services/articles.service';
import { DemandeService } from '../../../services/demande.service';
import { UserService } from '../../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApprobationWorkflow } from '../../../models/approbation-workflow';
import { CommentAction } from '../../../models/comment-action';
import { ActionsType } from '../../../workflow/config/actions-type.enum';
import { ActionsHistories } from '../../../models/actions-histories';

@Component({
  selector: 'app-details-demandes-in',
  templateUrl: './details-demandes-in.component.html',
  styleUrls: ['./details-demandes-in.component.scss']
})
export class DetailsDemandesInComponent implements OnInit {

  statut = STATUT;

  demande: Demandes = new Demandes();
  productDetails: Articles = new Articles();
  demadeForm: FormGroup;
  isLoading = true;
  userInfo: EntrepriseUserInfos = new EntrepriseUserInfos();
  workFlow: ActionsHistories[] = [];
  constructor(private messageboxService: MessageboxService, private entrepriseUserinfos: EntrepriseUserInfosService, private articleService: ArticlesService, private demandeServices: DemandeService, private userServices: UserService, private fb: FormBuilder, public dialogRef: MatDialogRef<DetailsDemandesInComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.demande = this.data.demande;
    this.getUserInfo(this.demande.userId);
    this.getProductDetaile(this.demande.productId);
    this.getWorkFlow(this.demande.id);
  }

  getStatut(value) {
    return STATUT.find(e => e.value === value);

  }

    ngOnInit() {
    this.creaform();
  }
  creaform() {
this.demadeForm = this.fb.group({
     comment: ['', Validators.required]
});
  }
  onNoClick(): void {
    this.dialogRef.close({result: 0});
  }

  getUserInfo(id) {
    this.entrepriseUserinfos.getEntrepriseUserInfosByUserId(id).subscribe(res => {
      this.userInfo = res;
      console.log(res);
    }

    );
  }


  getWorkFlow(id) {
    this.articleService.getworkFlowStatById(id).subscribe(
    res => {
      this.workFlow = res;
    }
    );
  }
  getProductDetaile(id) {
   this.articleService.getArticlesById(id).subscribe(res => {
        this.productDetails = res;
        this.isLoading = false;
        console.log(res);
   });
  }

  rejectDemande() {
    const commentAction = new CommentAction();
    commentAction.commentDate = new Date();
    commentAction.comment = this.demadeForm.get('comment').value;
    commentAction.demandesId = this.data.demande.id;
    commentAction.actionsType = ActionsType.Rejeter;
   // approbationWorkflow.globalStatut=3;

    this.messageboxService.ShowMessage('Avertissement', 'approuvrer cette demandes ?', '', 2, false, 1, '520px', 'warning', 'warn').subscribe(
      res => {
        const r: any = res;
        if (r.result === 'yes') {
          this.demandeServices.commentDemandes(commentAction).subscribe(response => {
                console.log(response);
                this.messageboxService.ShowMessage('Information', ' Demande aprouvée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
                this.dialogRef.close({result: 1});
          });

        }
      }
    );
  }

  ValidateDemande() {
   const commentAction = new CommentAction();
    commentAction.commentDate = new Date();
    commentAction.comment = this.demadeForm.get('comment').value;
    commentAction.demandesId = this.data.demande.id;
    commentAction.actionsType = ActionsType.Approuver;
   // approbationWorkflow.globalStatut=3;

    this.messageboxService.ShowMessage('Avertissement', 'approuvrer cette demandes ?', '', 2, false, 1, '520px', 'warning', 'primary').subscribe(
      res => {
        const r: any = res;
        if (r.result === 'yes') {
          this.demandeServices.commentDemandes(commentAction).subscribe(response => {
                console.log(response);
                this.messageboxService.ShowMessage('Information', ' Demande aprouvée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
                this.dialogRef.close({result: 1});
          });

        }
      }
    );
  }



}
