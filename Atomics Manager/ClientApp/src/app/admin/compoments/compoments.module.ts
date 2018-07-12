import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import{LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import { FocusDirective } from '../directives/focus.directive';
import { NavigationService } from '../services/navigation.service';
import { AddVillesDialogComponent } from './villes/dialog/add/add-villes-dialog/add-villes-dialog.component';
import { EditVillesDialogComponent } from './villes/dialog/edit/edit-villes-dialog/edit-villes-dialog.component';
import { DevisesComponent } from './devises/devises.component';
import { SecteursComponent } from './secteurs/secteurs.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { BankInfosComponent } from './bank-infos/bank-infos.component';
import { AddSecteursDialogComponent } from './secteurs/dialog/add/add-secteurs-dialog/add-secteurs-dialog.component';
import { EditSecteursDialogComponent } from './secteurs/dialog/edit/edit-secteurs-dialog/edit-secteurs-dialog.component';
import { EditDevisesDialogComponent } from './devises/dialogs/edit/edit-devises-dialog/edit-devises-dialog.component';
import { AddDevisesDialogComponent } from './devises/dialogs/add/add-devises-dialog/add-devises-dialog.component';
import { DevisesService } from '../services/devises.service';
import { AddFournisseursDialogComponent } from './fournisseurs/dialog/add/add-fournisseurs-dialog/add-fournisseurs-dialog.component';
import { EditFournisseursDialogComponent } from './fournisseurs/dialog/edit/edit-fournisseurs-dialog/edit-fournisseurs-dialog.component';


//import { AccountService } from '../services/account.service';



@NgModule({
  imports: [
    CommonModule,
    MaterialDesignModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    FocusDirective,
    DevisesComponent,
    SecteursComponent,
    FournisseursComponent,
    BankInfosComponent,
   
    
   
    
  
    
    
   
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    NavigationService,
    
  
  ],
  entryComponents:[
    
  ]

})
export class CompomentsModule { }
