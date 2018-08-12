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
  declarations: [ProcessComponent, EditProcessDialogComponent, AddProcessDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class WorkflowModule { }
