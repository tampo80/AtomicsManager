import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcessService } from '../../../services/process.service';
import { ActionsService } from '../../../services/actions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { enumSelector } from '../../../../shared/utilities/utilities';
import { Actions } from '../../../models/actions';
import { ActionsType } from '../../../config/actions-type.enum';

import { ActionTarget } from '../../../models/action-target';
import { Group } from '../../../models/group';
import { TypeTarget } from '../../../config/type-target.enum';
import { GroupService } from '../../../services/group.service';
import { ActionTargetService } from '../../../services/action-target.service';

@Component({
  selector: 'app-set-action-target',
  templateUrl: './set-action-target.component.html',
  styleUrls: ['./set-action-target.component.scss']
})
export class SetActionTargetComponent implements OnInit {




  actions: Actions[] = [];
  groups: Group[] = [];
  actionTargetFrom: FormGroup;
  actionTarget: ActionTarget;
  typeTagets: any[] ;

  constructor(private actionTargetService: ActionTargetService, private groupService: GroupService, private processService: ProcessService, private actionsServices: ActionsService, private fb: FormBuilder, public dialogRef: MatDialogRef<SetActionTargetComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {
     this.actionTarget = new ActionTarget();
     this.actionTarget.id = 0;
      this.typeTagets = enumSelector(TypeTarget);

  }


  ngOnInit() {
    this.getGroup();
    this.getActionTargetByactionId();



    this.creatForm();

  }

getActionTargetByactionId() {
 this.actionTargetService.getActionTargetByActionId(this.data.actions.id).subscribe(res => {
  this.actionTarget = res;
  if (res != null) {

  this.actionTargetFrom.get('target').setValue(this.actionTarget.target);
  this.actionTargetFrom.get('group').setValue(this.actionTarget.groupId);
  this.actionTargetFrom.get('id').setValue(this.actionTarget.id);
  }
 });

}

creatForm() {
  this.actionTargetFrom = this.fb.group({
    id: [this.actionTarget.id],
    target: [this.actionTarget.target, Validators.required],
    group: [this.actionTarget.groupId]
  });
}

getGroup() {
  this.groupService.getGroup().subscribe(res => {
    this.groups = res;
  });
}




close() {
    this.dialogRef.close({result: 0});
  }


SetactionTarget() {

  this.actionTarget = new ActionTarget();
  this.actionTarget.id = this.actionTargetFrom.get('id').value;
  this.actionTarget.actionsId = this.data.actions.id;
  this.actionTarget.groupId = this.actionTargetFrom.get('group').value;
  this.actionTarget.target = this.actionTargetFrom.get('target').value;

  if (this.actionTarget.id > 0) {
        this.actionTargetService.updateActionTarget(this.actionTarget).subscribe(
          res => {
            this.dialogRef.close({result: 1});
          }
        );
  } else {
        this.actionTargetService.addActionTarget(this.actionTarget).subscribe(
          res => {
            this.dialogRef.close({result: 1});
          }
        );
  }

}
}
