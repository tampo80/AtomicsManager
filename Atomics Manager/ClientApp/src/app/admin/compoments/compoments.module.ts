import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import{LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FocusDirective } from '../directives/focus.directive';
import { NavigationService } from '../services/navigation.service';
import { DevisesComponent } from './devises/devises.component';
import { SecteursComponent } from './secteurs/secteurs.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { BankInfosComponent } from './bank-infos/bank-infos.component';


import { EntrepriseComponent } from './entreprise/entreprise.component';
import { FlexLayoutModule } from '../../../../node_modules/@angular/flex-layout';
import { AgencesComponent } from './agences/agences.component';
import { DepartementsComponent } from './departements/departements.component';
import { ServicesComponent } from './services/services.component';
import { AddDepartementsComponent } from './departements/dialog/add/add-departements/add-departements.component';
import { EditDepartementsComponent } from './departements/dialog/edit/edit-departements/edit-departements.component';
import { AddAgencesDialogComponent } from './agences/dialog/add/add-agences-dialog/add-agences-dialog.component';
import { EditAgencesDialogComponent } from './agences/dialog/edit/edit-agences-dialog/edit-agences-dialog.component';
import { AddServicesDialogComponent } from './services/dialog/add/add-services-dialog/add-services-dialog.component';
import { EditServicesDialogComponent } from './services/dialog/edit/edit-services-dialog/edit-services-dialog.component';
import { CategoriesComponent } from './categories/categories.component';
import { ArticlesComponent } from './articles/articles.component';
import { AddCategoriesDialogComponent } from './categories/dialog/add/add-categories-dialog/add-categories-dialog.component';
import { EditCategoriesDialogComponent } from './categories/dialog/edit/edit-categories-dialog/edit-categories-dialog.component';
import { AddArticlesDialogComponent } from './articles/add/add-articles-dialog/add-articles-dialog.component';
import { EditArticlesDialogComponent } from './articles/edit/edit-articles-dialog/edit-articles-dialog.component';


//import { AccountService } from '../services/account.service';



@NgModule({
  imports: [
    CommonModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [
    LoginComponent,
    FocusDirective,
    DevisesComponent,
    SecteursComponent,
    FournisseursComponent,
    BankInfosComponent,
    EntrepriseComponent,
    AgencesComponent,
    DepartementsComponent,
    ServicesComponent,
    AddDepartementsComponent,
    EditDepartementsComponent,
    AddAgencesDialogComponent,
    EditAgencesDialogComponent,
    AddServicesDialogComponent,
    EditServicesDialogComponent,
    CategoriesComponent,
    ArticlesComponent,
    AddCategoriesDialogComponent,
    EditCategoriesDialogComponent,
    AddArticlesDialogComponent,
    EditArticlesDialogComponent










  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    NavigationService,


  ],
  entryComponents:[
    AddDepartementsComponent,
    EditDepartementsComponent,
    AddAgencesDialogComponent,
    EditAgencesDialogComponent,
    AddServicesDialogComponent,
    EditServicesDialogComponent,
    AddCategoriesDialogComponent,
    EditCategoriesDialogComponent,
    AddArticlesDialogComponent,
    EditArticlesDialogComponent

  ]

})
export class CompomentsModule { }
