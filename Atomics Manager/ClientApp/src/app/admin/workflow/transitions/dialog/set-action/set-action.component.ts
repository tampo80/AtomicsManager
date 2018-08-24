import { Component, OnInit, Inject } from '@angular/core';
import { ActionsService } from '../../../services/actions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-set-action',
  templateUrl: './set-action.component.html',
  styleUrls: ['./set-action.component.scss']
})
export class SetActionComponent implements OnInit {

  setActionForm: FormGroup;
  setActionFrControlArray: FormArray = this.fb.array([]);
  actions: any[] = [];
  actionsIds: number[] = [];

  constructor(private actionsService: ActionsService, private fb: FormBuilder, public dialogRef: MatDialogRef<SetActionComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {
    this.getTa();
    this.creatForm();



  }

  get Actions() {

    return this.setActionForm.get('action');
  }

  buidCheck() {
    this.setActionFrControlArray = this.setActionForm.get('action') as FormArray;
    const arr = this.actions.map(action => {
      return this.fb.control(action.selected);
    });
    this.setActionFrControlArray = this.fb.array(arr);
  }
  creatForm() {

    this.setActionForm = this.fb.group({
      action: this.fb.array([])
  });

  }

  updateChecked(isChecked, id) {
    const chkArray =  this.setActionFrControlArray.value;
    const actionsId = [];

    chkArray.forEach((element, index) => {
      if (element === true) {
          actionsId.push(this.actions[index].id);
      }
    });

    console.log(actionsId);
  }
  updateChkbxArray(id, isChecked, key) {
    const chkArray = < FormArray > this.setActionFrControlArray.get(key);
    if (isChecked) {
      chkArray.push(new FormControl(id));
    } else {
      const idx = chkArray.controls.findIndex(x => x.value === id);
      chkArray.removeAt(idx);
    }
  }

  getTa() {
    this.actionsService.getActionsIds(this.data.transition.id).subscribe(
      res => {
        this.actionsIds = res;
        this.getActions();

      }


  );
}
  getActions() {
    this.actionsService.getActions().subscribe(
      res => {
       // this.actions = res;
       res.forEach(el => {

        const idx = this.actionsIds.find(e => e.valueOf() === el.id);
         if (idx >= 0) {
          this.actions.push( {
            id: el.id,
            selected: true,
            label: el.name
         });
         } else {
          this.actions.push( {
            id: el.id,
            selected: false,
            label: el.name
         });
         }

       });
       this.buidCheck();
      }
    );


  }



  ngOnInit() {


  }
  close() {
    this.dialogRef.close({result: 0});
  }

  SetActions() {
    const chkArray =  this.setActionFrControlArray.value;
    const actionsId = [];

    chkArray.forEach((element, index) => {
      if (element === true) {
          actionsId.push(this.actions[index].id);
      }
    });
    const ac = {
      actionsIds: actionsId,
      transitionId: this.data.transition.id
    };
    this.actionsService.addtransitionActions(ac).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}
