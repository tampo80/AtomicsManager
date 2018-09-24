import { Component, OnInit, Inject } from '@angular/core';
import * as _moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BonLivraison } from '../../../models/bon-livraison';
import { Demandes } from '../../../models/demandes';
import { Articles } from '../../../models/articles';
import { EntrepriseUserInfos } from '../../../models/entreprise-user-infos';
import { ActionsHistories } from '../../../models/actions-histories';
import { BonLivraisonService } from '../../../services/bon-livraison.service';
import { MessageboxService } from '../../../services/messagebox.service';
import { enumSelector } from '../../../shared/utilities/utilities';
import { YesNo } from '../../../config/yes-no.enum';
import { STATUT } from '../../../config/enum-data';
import { EntrepriseUserInfosService } from '../../../services/entreprise-user-infos.service';
import { ArticlesService } from '../../../services/articles.service';
import { UserService } from '../../../services/user.service';
import { DemandeService } from '../../../services/demande.service';
import {default as _rollupMoment} from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../models/user.model';
import { AccountService } from '../../../services/account.service';
import { startWith, map } from 'rxjs/operators';
const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-set-bon-livraison',
  templateUrl: './set-bon-livraison.component.html',
  styleUrls: ['./set-bon-livraison.component.scss'],

  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SetBonLivraisonComponent implements OnInit {


  rating = 4;

  statut = STATUT;
  actionLabel = 'Créer';
  BL: BonLivraison = new BonLivraison();

  demande: Demandes = new Demandes();
  productDetails: Articles = new Articles();
  bonLivraisonForm: FormGroup;
  isLoading = true;
  userInfo: EntrepriseUserInfos = new EntrepriseUserInfos();
  workFlow: ActionsHistories[] = [];
  yesNo: any[];
  members: User[] = [];
  filteredUsers: Observable<User[]>;

  selectedController: User = new User();

  constructor(private accountService: AccountService, private bonLivraisonService: BonLivraisonService,  private dateAdapter: DateAdapter<Date>, private messageboxService: MessageboxService, private entrepriseUserinfos: EntrepriseUserInfosService, private articleService: ArticlesService, private demandeServices: DemandeService, private userServices: UserService, private fb: FormBuilder, public dialogRef: MatDialogRef<SetBonLivraisonComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.BL = new BonLivraison();

    this.dateAdapter.setLocale('fr');
    this.demande = this.data.demande;

    this.getUserInfo(this.demande.userId);
    this.getProductDetaile(this.demande.productId);
    this.getWorkFlow(this.demande.id);
    this.yesNo = enumSelector(YesNo);
  }



  getStatut(value) {
    return STATUT.find(e => e.value === value);

  }
  getUsers() {
    this.accountService.getUsers().subscribe(res => {
      this.members = res;
      this.getBonLivraison(this.demande.id);
    });
  }

  getSelectedController(id) {
    return this.members.find(e => e.id === id);
  }

    ngOnInit() {


      this.getUsers();
    //  this.getComptesInternes();
      this.creaform();
      this.filteredUsers = this.bonLivraisonForm.get('controleurId').valueChanges.pipe(
        startWith<string|User>(''),
        map(value => typeof value === 'string' ? value : value.userName),
        map(userName => userName ? this._filterUsers(userName) : this.members.slice())
      );


  }



  displayFn(user?: User): string | undefined {
    return user ? user.userName : undefined;
  }

  _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.members.filter(option => option.userName.toLowerCase().indexOf(filterValue) !== -1);
  }
  creaform() {
    this.bonLivraisonForm = this.fb.group({
      id: [0],
      refBL: [''],

      livreure: [''],
      dateLivraison: [moment()],
      isInSla: [''],
      control: ['', Validators.required],
      controleurId: [''],
      controleurUserName: [''],
      matchToBon: [''],
      commentaire: [''],
      noteFournisseur: [''],

});


  }

  getBonLivraison(damandeId) {
    this.bonLivraisonService.getBonLivraisonBydemandId(damandeId).subscribe(res => {
      console.log(res);
      this.BL = res != null ? res : this.BL;
      if (this.BL.id > 0) {
        this.actionLabel = 'Modifier';
        this.bonLivraisonForm.get('isInSla').setValue(this.BL.isInSla);
        this.bonLivraisonForm.get('matchToBon').setValue(this.BL.matchToBon);
        this.bonLivraisonForm.get('refBL').setValue(this.BL.refBL);
        this.bonLivraisonForm.get('livreure').setValue(this.BL.livreure);
        this.bonLivraisonForm.get('dateLivraison').setValue(this.BL.dateLivraison);
        this.bonLivraisonForm.get('controleurUserName').setValue(this.BL.controleurUserName);
        this.bonLivraisonForm.get('control').setValue(this.BL.control);
        this.bonLivraisonForm.get('commentaire').setValue(this.BL.commentaire);
        this.bonLivraisonForm.get('noteFournisseur').setValue(this.BL.noteFournisseur);
        this.bonLivraisonForm.get('controleurId').setValue(this.getSelectedController(this.BL.controleurId));
      //  this.bonLivraisonForm.get('').setValue(this.BL.libele);
      }
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


  ontvaDeductible(data: any) {
      const tvaControl = this.bonLivraisonForm.get('tva');
      console.log(data);
      if (data) {
             tvaControl.setValidators([Validators.required]);
      } else {
        tvaControl.setValidators([]);
      }

      tvaControl.updateValueAndValidity();
  }



  AddLivraison () {
    const bonLivraison = new BonLivraison();
    bonLivraison.id = this.BL.id;
    bonLivraison.isInSla =  this.bonLivraisonForm.get('isInSla').value;
    bonLivraison.matchToBon =  this.bonLivraisonForm.get('matchToBon').value;
    bonLivraison.refBL = this.bonLivraisonForm.get('refBL').value;
    bonLivraison.livreure = this.bonLivraisonForm.get('livreure').value;
    bonLivraison.dateLivraison = this.bonLivraisonForm.get('dateLivraison').value;
    bonLivraison.controleurUserName = this.bonLivraisonForm.get('controleurUserName').value;
    bonLivraison.control = this.bonLivraisonForm.get('control').value;
    bonLivraison.commentaire = this.bonLivraisonForm.get('commentaire').value;
    bonLivraison.noteFournisseur = this.bonLivraisonForm.get('noteFournisseur').value;
    bonLivraison.controleurId = this.bonLivraisonForm.get('controleurId').value.id;
    bonLivraison.demandesId = this.demande.id;



    // approbationWorkflow.globalStatut=3;

     this.messageboxService.ShowMessage('Avertissement', 'approuvrer cette demandes ?', '', 2, false, 1, '520px', 'info', 'primary').subscribe(
       res => {
         const r: any = res;
         if (r.result === 'yes') {
           if (this.BL.id > 0) {
            this.bonLivraisonService.updateBonLivraison(bonLivraison).subscribe(response => {
              console.log(response);
              this.messageboxService.ShowMessage('Information', ' Demande aprouvée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
              this.dialogRef.close({result: 1});
        });

           } else {
            this.bonLivraisonService.addBonLivraison(bonLivraison).subscribe(response => {
              console.log(response);
              this.messageboxService.ShowMessage('Information', ' Demande aprouvée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
              this.dialogRef.close({result: 1});
        });

           }

         }
       }
     );
   }


}
