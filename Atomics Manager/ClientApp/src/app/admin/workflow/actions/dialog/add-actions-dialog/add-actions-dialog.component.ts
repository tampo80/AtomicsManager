import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Process } from '../../../models/process';
import { ProcessService } from '../../../services/process.service';
import { ActionsType } from '../../../config/actions-type.enum';
import { ActionsService } from '../../../services/actions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { enumSelector } from '../../../../shared/utilities/utilities';
import { EditActionsDialogComponent } from '../edit-actions-dialog/edit-actions-dialog.component';
import { Actions } from '../../../models/actions';

@Component({
  selector: 'app-add-actions-dialog',
  templateUrl: './add-actions-dialog.component.html',
  styleUrls: ['./add-actions-dialog.component.scss']
})
export class AddActionsDialogComponent implements OnInit , AfterViewInit {

  actionsFromGroup: FormGroup;
  process: Process[] = [];
  public typeActions: any[];
  // typeActions = ActionsType;
  constructor(private processService: ProcessService, private actionsServices: ActionsService, private fb: FormBuilder, public dialogRef: MatDialogRef<EditActionsDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {

    this.typeActions = enumSelector(ActionsType); // Object.keys(this.typeActions).filter(f => !isNaN(Number(f)));
    this.createFrom();
    console.log(this.typeActions);

  }

  ngAfterViewInit() {


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
       name: ['', Validators.required],
       description: ['', Validators.required],
       process: ['', Validators.required],
       typeActions: ['', Validators.required],
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
    this.actionsServices.addActions(actions).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}
