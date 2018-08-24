import { Component, OnInit, Inject } from '@angular/core';
import { Activite } from '../../../models/activite';
import { Group } from '../../../models/group';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActiviteTarget } from '../../../models/activite-target';
import { ActiviteTargetService } from '../../../services/activite-target.service';
import { GroupService } from '../../../services/group.service';
import { ProcessService } from '../../../services/process.service';
import { ActiviteService } from '../../../services/activite.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { enumSelector } from '../../../../shared/utilities/utilities';
import { TypeTarget } from '../../../config/type-target.enum';

@Component({
  selector: 'app-set-activite-target',
  templateUrl: './set-activite-target.component.html',
  styleUrls: ['./set-activite-target.component.scss']
})
export class SetActiviteTargetComponent implements OnInit {




    activites: Activite[] = [];
    groups: Group[] = [];
    activiteTargetFrom: FormGroup;
    activiteTarget: ActiviteTarget;
    typeTagets: any[] ;

    constructor(private activiteTargetService: ActiviteTargetService, private groupService: GroupService, private processService: ProcessService, private activitesServices: ActiviteService, private fb: FormBuilder, public dialogRef: MatDialogRef<SetActiviteTargetComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {
       this.activiteTarget = new ActiviteTarget();
       this.activiteTarget.id = 0;
        this.typeTagets = enumSelector(TypeTarget);

    }


    ngOnInit() {
      this.getGroup();
      this.getactiviteTargetByactiviteId();



      this.creatForm();

    }

  getactiviteTargetByactiviteId() {
   this.activiteTargetService.getActiviteTargetByActiviteId(this.data.activite.id).subscribe(res => {
    this.activiteTarget = res;
    if (res != null) {

    this.activiteTargetFrom.get('target').setValue(this.activiteTarget.target);
    this.activiteTargetFrom.get('group').setValue(this.activiteTarget.groupId);
    this.activiteTargetFrom.get('id').setValue(this.activiteTarget.id);
    }
   });

  }

  creatForm() {
    this.activiteTargetFrom = this.fb.group({
      id: [this.activiteTarget.id],
      target: [this.activiteTarget.target, Validators.required],
      group: [this.activiteTarget.groupId]
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


  SetactiviteTarget() {

    this.activiteTarget = new ActiviteTarget();
    this.activiteTarget.id = this.activiteTargetFrom.get('id').value;
    this.activiteTarget.activiteId = this.data.activite.id;
    this.activiteTarget.groupId = this.activiteTargetFrom.get('group').value;
    this.activiteTarget.target = this.activiteTargetFrom.get('target').value;

    if (this.activiteTarget.id > 0) {
          this.activiteTargetService.updateActiviteTarget(this.activiteTarget).subscribe(
            res => {
              this.dialogRef.close({result: 1});
            }
          );
    } else {
          this.activiteTargetService.addActiviteTarget(this.activiteTarget).subscribe(
            res => {
              this.dialogRef.close({result: 1});
            }
          );
    }

  }
  }
