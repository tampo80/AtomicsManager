import { Component, OnInit, Inject } from '@angular/core';
import { Etat } from '../../models/etat';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EtatService } from '../../services/etat.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TypeEtat } from '../../config/type-etat.enum';
import { ProcessService } from '../../services/process.service';
import { Process } from '../../models/process';
import { enumSelector } from '../../../shared/utilities/utilities';


@Component({
  selector: 'app-add-etat-dialog',
  templateUrl: './add-etat-dialog.component.html',
  styleUrls: ['./add-etat-dialog.component.scss']
})
export class AddEtatDialogComponent implements OnInit {

  etatFromGroup: FormGroup;
  process: Process[] = [];
  typeEtats: any[];
  typeEtat = TypeEtat;
  constructor(private processService: ProcessService, private etatServices: EtatService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddEtatDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {
    this.typeEtats = enumSelector(TypeEtat); // Object.keys(this.typeEtat).filter(f => !isNaN(Number(f)));


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
   this.etatFromGroup = this.fb.group(
     {
       name: ['', Validators.required],
       description: ['', Validators.required],
       process: ['', Validators.required],
       typeEtat: ['', Validators.required],
     }
   );
  }

  AddEtat() {
    const etat = new Etat();
    etat.name = this.etatFromGroup.get('name').value;
    etat.description = this.etatFromGroup.get('description').value;
    etat.typeEtats = this.etatFromGroup.get('typeEtat').value;
    etat.processId = this.etatFromGroup.get('process').value;
    this.etatServices.addEtat(etat).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}
