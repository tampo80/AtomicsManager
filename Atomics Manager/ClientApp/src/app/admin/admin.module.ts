import { CommonModule, registerLocaleData } from '@angular/common';
import { ErrorHandler, NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
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
import { AddFournisseursDialogComponent } from './compoments/fournisseurs/dialog/add/add-fournisseurs-dialog/add-fournisseurs-dialog.component';
import { EditFournisseursDialogComponent } from './compoments/fournisseurs/dialog/edit/edit-fournisseurs-dialog/edit-fournisseurs-dialog.component';
import { ProfileComponent } from './me/profile/profile.component';
import { EditPasswordComponent } from './me/profile/dialogs/edit-password/edit-password.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { FileSizePipe } from './pipes/file-size.pipe';
import { ImagesService } from './services/images.service';

import { TruncateModule } from 'ng2-truncate';

import localeFr from '@angular/common/locales/fr';
import { DemandesCataloguesComponent } from './demandes/demandes-catalogues/demandes-catalogues.component';
import { CatalogViewComponent } from './demandes/demandes-catalogues/catalog-view/catalog-view.component';
import { WidgetStateComponent } from './widget/widget-state/widget-state.component';
import { FooterComponent } from './footer/footer.component';
import { IniDemandeComponent } from './demandes/ini-demande/ini-demande.component';

import { MesDemandesComponent } from './demandes/mes-demandes/mes-demandes.component';
import { DetailOwndemandesComponent } from './demandes/mes-demandes/detail-owndemandes/detail-owndemandes.component';
import { DetaildemandesInComponent } from './demandes/detaildemandes-in/detaildemandes-in.component';
import { DemandesInComponent } from './demandes/demandes-in/demandes-in.component';
import { DetailsDemandesInComponent } from './demandes/demandes-in/details-demandes-in/details-demandes-in.component';
import { WorkflowModule } from './workflow/workflow.module';
import { NewEditionDialogComponent } from './shared/new-edition-dialog/new-edition-dialog.component';
import { SignalRService } from './signalr/signal-r.service';
import { TypeComptesComponent } from './comptabilite/typecomptes/type-comptes/type-comptes.component';
import { ComptesInternesComponent } from './comptabilite/comptesinternes/comptes-internes/comptes-internes.component';
import { AddTypeComptesDialogComponent } from './comptabilite/typecomptes/type-comptes/dialog/add-type-comptes-dialog/add-type-comptes-dialog.component';
import { EditTypeComptesDialogComponent } from './comptabilite/typecomptes/type-comptes/dialog/edit-type-comptes-dialog/edit-type-comptes-dialog.component';
import { AddComptesInternesDialogComponent } from './comptabilite/comptesinternes/comptes-internes/dialog/add-comptes-internes-dialog/add-comptes-internes-dialog.component';
import { EditComptesInternesDialogComponent } from './comptabilite/comptesinternes/comptes-internes/dialog/edit-comptes-internes-dialog/edit-comptes-internes-dialog.component';
import { FacturesComponent } from './demandes/demandes-in/setFacture/factures/factures.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyMaskDirective } from './directives/currency-mask.directive';
import { CurrencyMaskService } from './services/currency-mask.service';
import { FacturationComponent } from './comptabilite/factures/facturation/facturation.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';

registerLocaleData(localeFr);

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  decimal: ' ',
  precision: 0,
  prefix: '',
  suffix: ' CFA',
  thousands: ' '
};

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
    CompomentsModule,
    PerfectScrollbarModule,
    TruncateModule,
    WorkflowModule,
    MaterialDesignModule,            // <----- this module will be deprecated in the future version.
    MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule,
    CurrencyMaskModule,
    NgxGraphModule,
    NgxChartsModule,

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
    AddFournisseursDialogComponent,
    EditFournisseursDialogComponent,
    ProfileComponent,
    EditPasswordComponent,

    FileSizePipe,

    DemandesCataloguesComponent,

    CatalogViewComponent,

    WidgetStateComponent,

    FooterComponent,

    IniDemandeComponent,


    MesDemandesComponent,

    DetailOwndemandesComponent,

    DetaildemandesInComponent,

    DemandesInComponent,

    DetailsDemandesInComponent,

    NewEditionDialogComponent,

    TypeComptesComponent,


    ComptesInternesComponent,


    AddTypeComptesDialogComponent,


    EditTypeComptesDialogComponent,


    AddComptesInternesDialogComponent,


    EditComptesInternesDialogComponent,



    FacturesComponent,



    FacturationComponent,





  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    MessageBoxDialogComponent,
    CurrencyMaskDirective
  ],
  providers: [
    NavigationService,
    ThemeService,
    AlertService,
    MessageboxService,
    HttpErrorHandler,
    AccountService,
    DevisesService,
    SignalRService,
    ImagesService,
    CurrencyMaskService,

    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorInterceptor
    },
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
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
    AddFournisseursDialogComponent,
    EditFournisseursDialogComponent,
    EditPasswordComponent,
    DetailOwndemandesComponent,
    IniDemandeComponent,
    DetailsDemandesInComponent,
    AddTypeComptesDialogComponent,

    FacturesComponent,
    EditTypeComptesDialogComponent,


    AddComptesInternesDialogComponent,


    EditComptesInternesDialogComponent,

  ]
})
export class AdminModule { }
