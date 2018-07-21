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
    EntrepriseComponent










  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    NavigationService,


  ],
  entryComponents:[

  ]

})
export class CompomentsModule { }
