import { Component, OnInit, Inject } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Group } from '../../../models/group';
import { ProcessService } from '../../../services/process.service';
import { Process } from '../../../models/process';


@Component({
  selector: 'app-edit-group-dialog',
  templateUrl: './edit-group-dialog.component.html',
  styleUrls: ['./edit-group-dialog.component.scss']
})
export class EditGroupDialogComponent implements OnInit {
  groupFromGroup: FormGroup;
  process: Process[] = [];
  constructor(private groupService: ProcessService, private groupServices: GroupService, private fb: FormBuilder, public dialogRef: MatDialogRef<EditGroupDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) { }

  ngOnInit() {
    this.getProcess();
    this.createFrom();
  }

  getProcess() {
    this.groupService.getProcess().subscribe(
      res => {
        this.process = res;

      }
    );
  }
  close() {
    this.dialogRef.close({result: 0});
  }

  createFrom() {
   this.groupFromGroup = this.fb.group(
     {
      name: [this.data.group.name, Validators.required],
      description: [this.data.group.description, Validators.required],
      process: [this.data.group.processId , Validators.required],
     }
   );
  }

  AddGroup() {
    const group = new Group();
    group.name = this.groupFromGroup.get('name').value;
    group.description = this.groupFromGroup.get('description').value;
    group.id = this.data.group.id;
    group.processId = this.groupFromGroup.get('process').value;
    this.groupServices.updateGroup(group).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}
