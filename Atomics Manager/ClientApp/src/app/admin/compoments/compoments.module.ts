import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import{LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import { FocusDirective } from '../directives/focus.directive';
import { NavigationService } from '../services/navigation.service';


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
  
    
    
   
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[NavigationService]

})
export class CompomentsModule { }
