import { Component, OnInit, Inject } from '@angular/core';
import { ActionsService } from '../../../services/actions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Actions } from '../../../models/actions';
import { Group } from '../../../models/group';

@Component({
  selector: 'app-set-action',
  templateUrl: './set-action.component.html',
  styleUrls: ['./set-action.component.scss']
})
export class SetActionComponent implements OnInit {

  setActionForm: FormGroup;
  setActionFrControlArray: FormArray;
  actions: Actions[] = [];
  constructor(private actionsService: ActionsService, private fb: FormBuilder, public dialogRef: MatDialogRef<SetActionComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {
    this.getActions();

  }

  creatForm() {
  this.setActionForm = this.fb.group({
      action: this.fb.array([{}])
  });
  }

  getActions() {
    this.actionsService.getActions().subscribe(
      res => {
        this.actions = res;
        console.log(res);
      }
    );
  }
  ngOnInit() {

  }
  close() {
    this.dialogRef.close({result: 0});
  }
}
