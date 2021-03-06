import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TypeComptes } from '../../../../models/type-comptes';
import { TypeComptesService } from '../../../../services/type-comptes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { enumSelector } from '../../../../../shared/utilities/utilities';
import { NatureCompte } from '../../../../config/nature-compte.enum';

@Component({
  selector: 'app-add-type-comptes-dialog',
  templateUrl: './add-type-comptes-dialog.component.html',
  styleUrls: ['./add-type-comptes-dialog.component.scss']
})
export class AddTypeComptesDialogComponent implements OnInit {

  typeComptesFromGroup: FormGroup;
  public natureComptes: any[];
  constructor( private typeComptesServices: TypeComptesService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddTypeComptesDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {


    this.natureComptes = enumSelector(NatureCompte);
   }

  ngOnInit() {

    this.createFrom();
  }


  close() {
    this.dialogRef.close({result: 0});
  }

  createFrom() {
   this.typeComptesFromGroup = this.fb.group(
     {
       name: ['', Validators.required],
       description: ['', Validators.required],
       natureComptes: ['', Validators.required],

     }
   );
  }

  AddTypeComptes() {
    const typeComptes = new TypeComptes();
    typeComptes.name = this.typeComptesFromGroup.get('name').value;
    typeComptes.description = this.typeComptesFromGroup.get('description').value;
    typeComptes.natureCompte = this.typeComptesFromGroup.get('natureComptes').value;
    this.typeComptesServices.addTypeComptes(typeComptes).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}
