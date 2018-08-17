import { Component, OnInit, Inject } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Group } from '../../../models/group';
import { ProcessService } from '../../../services/process.service';
import { Process } from '../../../models/process';
import { TypeEtat } from '../../../config/type-etat.enum';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent implements OnInit {

  groupFromGroup: FormGroup;
  process: Process[] = [];

  constructor(private procesService: ProcessService, private groupServices: GroupService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddGroupDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {


   }

  ngOnInit() {
    this.getProcess();
    this.createFrom();
  }
  getProcess() {
    this.procesService.getProcess().subscribe(
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
       name: ['', Validators.required],
       description: ['', Validators.required],
       process: ['', Validators.required],

     }
   );
  }

  AddGroup() {
    const group = new Group();
    group.name = this.groupFromGroup.get('name').value;
    group.description = this.groupFromGroup.get('description').value;
    group.processId = this.groupFromGroup.get('process').value;
    this.groupServices.addGroup(group).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}
