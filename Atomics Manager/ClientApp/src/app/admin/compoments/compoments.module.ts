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
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { CurrencyMaskModule } from "ng2-currency-mask";

//import { AccountService } from '../services/account.service';

import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import { CurrencyMaskService } from '../services/currency-mask.service';
import { CurrencyMaskDirective } from '../directives/currency-mask.directive';
import { UdpCurrencyMaskPipe } from '../pipes/udp-currency-mask.pipe';
import { APGembersComponent } from './a-pgembers/a-pgembers.component';
import { ProfilComponent } from './profil/profil.component';
import { SetUserPositionComponent } from './users/dialogs/set-user-position/set-user-position.component';
import { ApprobationLevelComponent } from './approbation-level/approbation-level.component';
import { AddApprobationLevelDialogComponent } from './approbation-level/dialog/add/add-approbation-level-dialog/add-approbation-level-dialog.component';
import { EditApprobationLevelDialogComponent } from './approbation-level/dialog/edit/edit-approbation-level-dialog/edit-approbation-level-dialog.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: " ",
    precision: 0,
    prefix: "",
    suffix: " CFA",
    thousands: " "
};

@NgModule({
  imports: [
    CommonModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CurrencyMaskModule,


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
    EditArticlesDialogComponent,
    CurrencyMaskDirective,
    APGembersComponent,
    ProfilComponent,
    SetUserPositionComponent,
    ApprobationLevelComponent,
    AddApprobationLevelDialogComponent,
    EditApprobationLevelDialogComponent










  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    NavigationService,
    CurrencyMaskService,

    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }

  ],
  exports: [CurrencyMaskDirective],
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
    EditArticlesDialogComponent,
    SetUserPositionComponent,
    AddApprobationLevelDialogComponent,
    EditApprobationLevelDialogComponent


  ]

})
export class CompomentsModule { }
