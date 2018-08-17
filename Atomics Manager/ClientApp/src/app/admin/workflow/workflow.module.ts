import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProcessComponent } from './process/process.component';
import { EditProcessDialogComponent } from './process/dialog/edit-process-dialog/edit-process-dialog.component';
import { AddProcessDialogComponent } from './process/dialog/add-process-dialog/add-process-dialog.component';
import { WorkFlowGroupComponent } from './work-flow-group/work-flow-group.component';
import { AddGroupDialogComponent } from './work-flow-group/dialog/add-group-dialog/add-group-dialog.component';
import { EditGroupDialogComponent } from './work-flow-group/dialog/edit-group-dialog/edit-group-dialog.component';
import { AddGroupMembersDialogComponent } from './work-flow-group/dialog/add-group-members-dialog/add-group-members-dialog.component';
import { EtatsComponent } from './etats/etats.component';
import { AddEtatDialogComponent } from './etats/add-etat-dialog/add-etat-dialog.component';
import { EditEtatDialogComponent } from './etats/edit-etat-dialog/edit-etat-dialog.component';
import { ActionsComponent } from './actions/actions.component';
import { AddActionsDialogComponent } from './actions/dialog/add-actions-dialog/add-actions-dialog.component';
import { EditActionsDialogComponent } from './actions/dialog/edit-actions-dialog/edit-actions-dialog.component';
import { ActiviteComponent } from './activite/activite.component';
import { AddActiviteDialogComponent } from './activite/dialog/add-activite-dialog/add-activite-dialog.component';
import { EditActiviteDialogComponent } from './activite/dialog/edit-activite-dialog/edit-activite-dialog.component';
import { TransitionsComponent } from './transitions/transitions.component';
import { AddTransitionDialogComponent } from './transitions/dialog/add-transition-dialog/add-transition-dialog.component';
import { EditTransitionDialogComponent } from './transitions/dialog/edit-transition-dialog/edit-transition-dialog.component';
import { SetActionComponent } from './transitions/dialog/set-action/set-action.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CurrencyMaskModule,
    ImageCropperModule,
    NgxGraphModule,
    NgxChartsModule,

  ],
  declarations: [ProcessComponent,
    EditProcessDialogComponent,
    AddProcessDialogComponent,
    WorkFlowGroupComponent,
    AddGroupDialogComponent,
    EditGroupDialogComponent,
    AddGroupMembersDialogComponent,
    EtatsComponent,
    AddEtatDialogComponent,
    EditEtatDialogComponent,
    ActionsComponent,
    AddActionsDialogComponent,
    EditActionsDialogComponent,
    ActiviteComponent,
    AddActiviteDialogComponent,
    EditActiviteDialogComponent,
    TransitionsComponent,
    AddTransitionDialogComponent,
    EditTransitionDialogComponent,
    SetActionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    EditProcessDialogComponent,
    AddProcessDialogComponent,
    AddGroupDialogComponent,
    EditGroupDialogComponent,
    AddGroupMembersDialogComponent,
    AddEtatDialogComponent,
    EditEtatDialogComponent,
    AddActionsDialogComponent,
    EditActionsDialogComponent,
    AddActiviteDialogComponent,
    EditActiviteDialogComponent,
    AddTransitionDialogComponent,
    EditTransitionDialogComponent,
    SetActionComponent
  ],

})
export class WorkflowModule { }