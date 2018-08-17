import { Component, OnInit, Inject } from '@angular/core';
import { Process } from '../../../models/process';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ProcessService } from '../../../services/process.service';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-process-dialog',
  templateUrl: './edit-process-dialog.component.html',
  styleUrls: ['./edit-process-dialog.component.scss']
})
export class EditProcessDialogComponent implements OnInit {

  processFromGroup: FormGroup;
  constructor(private processServices: ProcessService, private fb: FormBuilder, public dialogRef: MatDialogRef<EditProcessDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) { }

  ngOnInit() {
    this.createFrom();
  }

  close() {
    this.dialogRef.close({result: 0});
  }

  createFrom() {
   this.processFromGroup = this.fb.group(
     {
       name: [this.data.process.name, Validators.required],
       description: [this.data.process.description, Validators.required]
     }
   );
  }

  AddProcess() {
    const process = new Process();
    process.name = this.processFromGroup.get('name').value;
    process.description = this.processFromGroup.get('description').value;
    process.id = this.data.process.id;
    this.processServices.updateProcess (process).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}
