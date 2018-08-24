import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActiviteService } from '../../services/activite.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Etat } from '../../models/etat';

@Component({
  selector: 'app-set-activites',
  templateUrl: './set-activites.component.html',
  styleUrls: ['./set-activites.component.scss']
})
export class SetActivitesComponent implements OnInit {

  setActiviteForm: FormGroup;
  setActiviteFrControlArray: FormArray = this.fb.array([]);
  activites: any[] = [];
  activitesIds: number[] = [];

  constructor(private activitesService: ActiviteService, private fb: FormBuilder, public dialogRef: MatDialogRef<SetActivitesComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {
    this.getTa();
    this.creatForm();



  }

  get Activites() {

    return this.setActiviteForm.get('activite');
  }

  buidCheck() {
    this.setActiviteFrControlArray = this.setActiviteForm.get('activite') as FormArray;
    const arr = this.activites.map(activite => {
      return this.fb.control(activite.selected);
    });
    this.setActiviteFrControlArray = this.fb.array(arr);
  }
  creatForm() {

    this.setActiviteForm = this.fb.group({
      activite: this.fb.array([])
  });

  }

  updateChecked(isChecked, id) {
    const chkArray =  this.setActiviteFrControlArray.value;
    const activitesId = [];

    chkArray.forEach((element, index) => {
      if (element === true) {
          activitesId.push(this.activites[index].id);
      }
    });

    console.log(activitesId);
  }
  updateChkbxArray(id, isChecked, key) {
    const chkArray = < FormArray > this.setActiviteFrControlArray.get(key);
    if (isChecked) {
      chkArray.push(new FormControl(id));
    } else {
      const idx = chkArray.controls.findIndex(x => x.value === id);
      chkArray.removeAt(idx);
    }
  }

  getTa() {
    this.activitesService.getActivitesByEtaIds(this.data.etat.id).subscribe(
      res => {
        this.activitesIds = res;
        this.getActivites();

      }


  );
}
  getActivites() {
    this.activitesService.getActivite().subscribe(
      res => {
       // this.activites = res;
       res.forEach(el => {

        const idx = this.activitesIds.find(e => e.valueOf() === el.id);
         if (idx >= 0) {
          this.activites.push( {
            id: el.id,
            selected: true,
            label: el.name
         });
         } else {
          this.activites.push( {
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

  SetActivites() {
    const chkArray =  this.setActiviteFrControlArray.value;
    const activitesId = [];

    chkArray.forEach((element, index) => {
      if (element === true) {
          activitesId.push(this.activites[index].id);
      }
    });
    const ac = {
      activitesIds: activitesId,
      etatId: this.data.etat.id
    };
    this.activitesService.addEtatActivites(ac).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}
