import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Process } from '../../../models/process';
import { ActionsType } from '../../../config/actions-type.enum';
import { ProcessService } from '../../../services/process.service';
import { ActionsService } from '../../../services/actions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { enumSelector } from '../../../../shared/utilities/utilities';
import { Actions } from '../../../models/actions';

@Component({
  selector: 'app-edit-actions-dialog',
  templateUrl: './edit-actions-dialog.component.html',
  styleUrls: ['./edit-actions-dialog.component.scss']
})
export class EditActionsDialogComponent implements OnInit {


  actionsFromGroup: FormGroup;
  process: Process[] = [];
  public typeActions: any[];

  constructor(private processService: ProcessService, private actionsServices: ActionsService, private fb: FormBuilder, public dialogRef: MatDialogRef<EditActionsDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {

    this.typeActions = enumSelector(ActionsType); // Object.keys(this.typeActions).filter(f => !isNaN(Number(f)));
    this.createFrom();
    console.log(this.typeActions);

  }


  ngOnInit() {
    this.getProcess();


  }
  getProcess() {
    this.processService.getProcess().subscribe(
      res => {
        this.process = res;

      }
    );
  }

  close() {
    this.dialogRef.close({result: 0});
  }

  compareType = (type1: number, type2: number) => type1 === type2;
  createFrom() {

   this.actionsFromGroup = this.fb.group(
     {
       name: [this.data.actions.name, Validators.required],
       description: [this.data.actions.description, Validators.required],
       process: [this.data.actions.processId, Validators.required],
       typeActions: [this.data.actions.typeAction, Validators.required],
     }
   );
  }

  AddActions() {
    const actions = new Actions();
    actions.id = this.data.actions.id;
    actions.name = this.actionsFromGroup.get('name').value;
    actions.description = this.actionsFromGroup.get('description').value;
    actions.typeAction = this.actionsFromGroup.get('typeActions').value;
    actions.processId = this.actionsFromGroup.get('process').value;
    console.log(actions);
    this.actionsServices.updateActions(actions).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}
