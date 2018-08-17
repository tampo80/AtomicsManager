import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Process } from '../../../models/process';
import { ProcessService } from '../../../services/process.service';

@Component({
  selector: 'app-add-process-dialog',
  templateUrl: './add-process-dialog.component.html',
  styleUrls: ['./add-process-dialog.component.scss']
})
export class AddProcessDialogComponent implements OnInit {

  processFromGroup: FormGroup;
  constructor(private processServices: ProcessService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddProcessDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) { }

  ngOnInit() {
    this.createFrom();
  }

  close() {
    this.dialogRef.close({result: 0});
  }

  createFrom() {
   this.processFromGroup = this.fb.group(
     {
       name: ['', Validators.required],
       description: ['', Validators.required]
     }
   );
  }

  AddProcess() {
    const process = new Process();
    process.name = this.processFromGroup.get('name').value;
    process.description = this.processFromGroup.get('description').value;
    this.processServices.addProcess(process).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}
