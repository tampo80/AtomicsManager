import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { transition } from '@angular/animations';
import { ProcessService } from '../../../services/process.service';
import { EtatService } from '../../../services/etat.service';
import { Etat } from '../../../models/etat';
import { Process } from '../../../models/process';
import { Transition } from '../../../models/transition';
import { TransitionService } from '../../../services/transition.service';

@Component({
  selector: 'app-add-transition-dialog',
  templateUrl: './add-transition-dialog.component.html',
  styleUrls: ['./add-transition-dialog.component.scss']
})
export class AddTransitionDialogComponent implements OnInit {

  transitionFrom: FormGroup;
  process: Process[] = [];
  etatActuel: Etat[] = [];
  etatSuivant: Etat[] = [];
  constructor(private transitionService: TransitionService, private processService: ProcessService, private etatService: EtatService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddTransitionDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) { }

  ngOnInit() {
    this.createForm();
    this.getProcess();
    this.getEtat();
  }

 getProcess() {
   this.processService.getProcess().subscribe(res => {
     this.process = res;
   });



 }

 getEtat() {
  this.etatService.getEtat().subscribe(res => {
    this.etatActuel = res;
    this.etatSuivant = res;
  });
}
  createForm() {
    this.transitionFrom = this.fb.group({
      process: ['', Validators.required],
      etatActuel: ['', Validators.required],
      etatSuivant: ['', Validators.required]
    });
  }
  close() {
    this.dialogRef.close({result: 0});
  }

  AddNew() {
    const _transition: Transition = new Transition();
    _transition.processId = this.transitionFrom.get('process').value;
    _transition.etatActuelId = this.transitionFrom.get('etatActuel').value;
    _transition.etatSuivantId = this.transitionFrom.get('etatSuivant').value;
   this.transitionService.addTransition(_transition).subscribe(res => {
    this.dialogRef.close({result: 1});
   });
  }
}
