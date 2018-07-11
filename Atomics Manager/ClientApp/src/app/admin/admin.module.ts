import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { GlobalErrorInterceptor } from './interceptors/global-error.interceptor';
import { ErrorPipe } from './pipes/error.pipe';
import { AlertService } from './services/alert.service';
import { NavigationService } from './services/navigation.service';
import { ThemeService } from './services/theme.service';
import { SideActionsComponent } from './side-navigation/side-actions/side-actions.component';
import { SideLogoComponent } from './side-navigation/side-logo/side-logo.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { AlertToolbarDialog } from './toolbar/alert-toolbar/alert-toolbar-dialog/alert-toolbar-dialog';
import { AlertToolbarComponent } from './toolbar/alert-toolbar/alert-toolbar.component';
import { ThemeSelectComponent } from './toolbar/theme-select/theme-select.component';
import { ToolbarMenuComponent } from './toolbar/toolbar-menu/toolbar-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageBoxDialogComponent } from './shared/message-box-dialog/message-box-dialog.component';
import { MessageboxService } from './services/messagebox.service';
import { UsersComponent } from './compoments/users/users.component';
import { AccountService } from './services/account.service';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { AddDialogComponent } from './compoments/users/dialogs/add/add-dialog/add-dialog.component';
import { EditDialogComponent } from './compoments/users/dialogs/edit/edit-dialog/edit-dialog.component';
import { RolesComponent } from './compoments/roles/roles.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddRolesDialogComponent } from './compoments/roles/dialogs/add/add-roles-dialog/add-roles-dialog.component';
import { EditRolesDialogComponent } from './compoments/roles/dialogs/edit/edit-roles-dialog/edit-roles-dialog.component';
import { GroupByPipe } from './pipes/group-by.pipe';
import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { PaysComponent } from './compoments/pays/pays.component';
import { AddPaysDialogComponent } from './compoments/pays/dialogs/add/add-pays-dialog/add-pays-dialog.component';
import { EditPaysDialogComponent } from './compoments/pays/dialogs/edit/edit-pays-dialog/edit-pays-dialog.component';
import { VillesComponent } from './compoments/villes/villes.component';
import { VillesService } from './services/villes.service';
import { AddVillesDialogComponent } from './compoments/villes/dialog/add/add-villes-dialog/add-villes-dialog.component';
import { EditVillesDialogComponent } from './compoments/villes/dialog/edit/edit-villes-dialog/edit-villes-dialog.component';
import { CompomentsModule } from './compoments/compoments.module';
import { DevisesService } from './services/devises.service';
import { EditDevisesDialogComponent } from './compoments/devises/dialogs/edit/edit-devises-dialog/edit-devises-dialog.component';
import { AddDevisesDialogComponent } from './compoments/devises/dialogs/add/add-devises-dialog/add-devises-dialog.component';
import { AddSecteursDialogComponent } from './compoments/secteurs/dialog/add/add-secteurs-dialog/add-secteurs-dialog.component';
import { EditSecteursDialogComponent } from './compoments/secteurs/dialog/edit/edit-secteurs-dialog/edit-secteurs-dialog.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
    MaterialDesignModule,
    AdminRoutingModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CompomentsModule
  ],
  declarations: [
    AdminComponent,
    ToolbarComponent,
    SideNavigationComponent,
    UnderConstructionComponent,
    ToolbarMenuComponent,
    SideLogoComponent,
    ThemeSelectComponent,
    SideActionsComponent,
    AlertToolbarComponent,
    AlertToolbarDialog,
    ErrorPipe,
    GroupByPipe,
    MessageBoxDialogComponent,
    UsersComponent,
    AddDialogComponent,
    RolesComponent,
    EditDialogComponent,
    AddRolesDialogComponent,
    EditRolesDialogComponent,
    MaterialDashboardComponent,
    PaysComponent,
    AddPaysDialogComponent,
    EditPaysDialogComponent,
    VillesComponent,
    AddVillesDialogComponent,
    EditVillesDialogComponent,
    EditDevisesDialogComponent,
    AddDevisesDialogComponent,
    AddSecteursDialogComponent,
    EditSecteursDialogComponent,
  ],
  exports: [
    MessageBoxDialogComponent
  ],
  providers: [
    NavigationService,
    ThemeService,
    AlertService,
    MessageboxService,
    HttpErrorHandler,
    AccountService,
    DevisesService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorInterceptor
    }
  ],
  entryComponents: [
    AlertToolbarDialog,
    MessageBoxDialogComponent,
    AddDialogComponent,
    
    EditDialogComponent,
    AddRolesDialogComponent,
    EditRolesDialogComponent,
    AddPaysDialogComponent,
    EditPaysDialogComponent,
    AddVillesDialogComponent,
    EditVillesDialogComponent,
    EditDevisesDialogComponent,
    AddDevisesDialogComponent,
    AddSecteursDialogComponent,
    EditSecteursDialogComponent,
  ]
})
export class AdminModule { }
