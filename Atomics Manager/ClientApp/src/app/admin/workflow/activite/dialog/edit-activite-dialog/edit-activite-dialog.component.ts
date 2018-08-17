import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { ActiviteService } from '../../../services/activite.service';
import { ProcessService } from '../../../services/process.service';
import { Process } from '../../../models/process';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TypeActivite } from '../../../config/type-activite.enum';
import { enumSelector } from '../../../../shared/utilities/utilities';
import { Activite } from '../../../models/activite';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-activite-dialog',
  templateUrl: './edit-activite-dialog.component.html',
  styleUrls: ['./edit-activite-dialog.component.scss']
})
export class EditActiviteDialogComponent implements OnInit , AfterViewInit {

    activiteFromGroup: FormGroup;
    process: Process[] = [];
   public typeActivites: any[];
    typeActivite = TypeActivite;
    constructor(private processService: ProcessService, private activiteServices: ActiviteService, private fb: FormBuilder, public dialogRef: MatDialogRef<EditActiviteDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {

      this.typeActivites = enumSelector(TypeActivite); // Object.keys(this.typeActivite).filter(f => !isNaN(Number(f)));
      this.createFrom();
      console.log(this.typeActivites);

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

     this.activiteFromGroup = this.fb.group(
       {
         name: [this.data.activite.name, Validators.required],
         description: [this.data.activite.descriptions, Validators.required],
         process: [this.data.activite.processId, Validators.required],
         typeActivite: [this.data.activite.typeActivite, Validators.required],
       }
     );
    }

    AddActivite() {
      const activite = new Activite();
      activite.id = this.data.activite.id;
      activite.name = this.activiteFromGroup.get('name').value;
      activite.descriptions = this.activiteFromGroup.get('description').value;
      activite.typeActivite = this.activiteFromGroup.get('typeActivite').value;
      activite.processId = this.activiteFromGroup.get('process').value;
      this.activiteServices.updateActivite(activite).subscribe(res => {
        this.dialogRef.close({result: 1});
      });
    }
  }
