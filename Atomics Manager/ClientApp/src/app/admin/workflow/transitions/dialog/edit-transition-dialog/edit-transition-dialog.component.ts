import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransitionService } from '../../../services/transition.service';
import { Process } from '../../../models/process';
import { Etat } from '../../../models/etat';
import { ProcessService } from '../../../services/process.service';
import { EtatService } from '../../../services/etat.service';
import { Transition } from '../../../models/transition';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-edit-transition-dialog',
  templateUrl: './edit-transition-dialog.component.html',
  styleUrls: ['./edit-transition-dialog.component.scss']
})
export class EditTransitionDialogComponent implements OnInit {
  transitionFrom: FormGroup;
  process: Process[] = [];
  etatActuel: Etat[] = [];
  etatSuivant: Etat[] = [];
  constructor(private transitionService: TransitionService, private processService: ProcessService, private etatService: EtatService, private fb: FormBuilder, public dialogRef: MatDialogRef<EditTransitionDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) { }

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
      process: [this.data.transition.processId, Validators.required],
      etatActuel: [this.data.transition.etatActuelId, Validators.required],
      etatSuivant: [this.data.transition.etatSuivantId, Validators.required]
    });
  }
  close() {
    this.dialogRef.close({result: 0});
  }

  EditTransition() {
    const _transition: Transition = new Transition();
    _transition.processId = this.transitionFrom.get('process').value;
    _transition.etatActuelId = this.transitionFrom.get('etatActuel').value;
    _transition.etatSuivantId = this.transitionFrom.get('etatSuivant').value;
    _transition.id = this.data.transition.id;
   this.transitionService.updateTransition(_transition).subscribe(res => {
    this.dialogRef.close({result: 1});
   });
  }
}
