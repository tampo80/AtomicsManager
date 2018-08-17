import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Process } from '../../../models/process';
import { TypeActivite } from '../../../config/type-activite.enum';
import { enumSelector } from '../../../../shared/utilities/utilities';
import { ProcessService } from '../../../services/process.service';
import { ActiviteService } from '../../../services/activite.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Activite } from '../../../models/activite';

@Component({
  selector: 'app-add-activite-dialog',
  templateUrl: './add-activite-dialog.component.html',
  styleUrls: ['./add-activite-dialog.component.scss']
})
export class AddActiviteDialogComponent implements OnInit {

  activiteFromGroup: FormGroup;
  process: Process[] = [];
  typeActivites: any[];
  typeActivite = TypeActivite;
  constructor(private processService: ProcessService, private activiteServices: ActiviteService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddActiviteDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {
    this.typeActivites = enumSelector(TypeActivite); // Object.keys(this.typeActivite).filter(f => !isNaN(Number(f)));


  }

  ngOnInit() {
    this.getProcess();

    this.createFrom();
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

  createFrom() {
   this.activiteFromGroup = this.fb.group(
     {
       name: ['', Validators.required],
       description: ['', Validators.required],
       process: ['', Validators.required],
       typeActivite: ['', Validators.required],
     }
   );
  }

  AddActivite() {
    const activite = new Activite();
    activite.name = this.activiteFromGroup.get('name').value;
    activite.descriptions = this.activiteFromGroup.get('description').value;
    activite.typeActivite = this.activiteFromGroup.get('typeActivite').value;
    activite.processId = this.activiteFromGroup.get('process').value;
    this.activiteServices.addActivite(activite).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}

