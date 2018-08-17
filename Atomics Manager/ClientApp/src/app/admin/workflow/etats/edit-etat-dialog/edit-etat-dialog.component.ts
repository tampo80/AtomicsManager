import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Etat } from '../../models/etat';
import { Process } from '../../models/process';
import { TypeEtat } from '../../config/type-etat.enum';
import { ProcessService } from '../../services/process.service';
import { EtatService } from '../../services/etat.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { enumSelector } from '../../../shared/utilities/utilities';

@Component({
  selector: 'app-edit-etat-dialog',
  templateUrl: './edit-etat-dialog.component.html',
  styleUrls: ['./edit-etat-dialog.component.scss']
})
export class EditEtatDialogComponent implements OnInit , AfterViewInit {

  etatFromGroup: FormGroup;
  process: Process[] = [];
 public typeEtats: any[];
  typeEtat = TypeEtat;
  constructor(private processService: ProcessService, private etatServices: EtatService, private fb: FormBuilder, public dialogRef: MatDialogRef<EditEtatDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {

    this.typeEtats = enumSelector(TypeEtat); // Object.keys(this.typeEtat).filter(f => !isNaN(Number(f)));
    this.createFrom();
    console.log(this.typeEtats);

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

   this.etatFromGroup = this.fb.group(
     {
       name: [this.data.etat.name, Validators.required],
       description: [this.data.etat.description, Validators.required],
       process: [this.data.etat.processId, Validators.required],
       typeEtat: [this.data.etat.typeEtats, Validators.required],
     }
   );
  }

  AddEtat() {
    const etat = new Etat();
    etat.id = this.data.etat.id;
    etat.name = this.etatFromGroup.get('name').value;
    etat.description = this.etatFromGroup.get('description').value;
    etat.typeEtats = this.etatFromGroup.get('typeEtat').value;
    etat.processId = this.etatFromGroup.get('process').value;
    this.etatServices.updateEtat(etat).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}
