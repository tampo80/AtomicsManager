import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ComptesInternes } from '../../../../models/comptes-internes';
import { TypeComptes } from '../../../../models/type-comptes';
import { TypeComptesService } from '../../../../services/type-comptes.service';
import { ComptesInternesService } from '../../../../services/comptes-internes.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-comptes-internes-dialog',
  templateUrl: './add-comptes-internes-dialog.component.html',
  styleUrls: ['./add-comptes-internes-dialog.component.scss']
})
export class AddComptesInternesDialogComponent implements OnInit {

  comptesInternesFromGroup: FormGroup;
  typeComptes: TypeComptes[] = [];
  public typeComptesInternes: any[];
  // typeComptesInternes = ComptesInternesType;
  constructor(private typeComptesService: TypeComptesService, private comptesInternesServices: ComptesInternesService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddComptesInternesDialogComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {

     // Object.keys(this.typeComptesInternes).filter(f => !isNaN(Number(f)));
    this.createFrom();
    console.log(this.typeComptesInternes);

  }


  ngOnInit() {
    this.getTypeComptes();


  }
  getTypeComptes() {
    this.typeComptesService.getTypeComptes().subscribe(
      res => {
        this.typeComptes = res;

      }
    );
  }

  close() {
    this.dialogRef.close({result: 0});
  }

  compareType = (type1: number, type2: number) => type1 === type2;
  createFrom() {

   this.comptesInternesFromGroup = this.fb.group(
     {
       name: ['', Validators.required],
       description: ['', Validators.required],
       typeComptes: ['', Validators.required],
       numCompte: ['', Validators.required]
     }
   );
  }

  AddComptesInternes() {
    const comptesInternes = new ComptesInternes();
    comptesInternes.id = this.data.comptesInternes.id;
    comptesInternes.label = this.comptesInternesFromGroup.get('name').value;
    comptesInternes.description = this.comptesInternesFromGroup.get('description').value;
    comptesInternes.numCompte = this.comptesInternesFromGroup.get('numCompte').value;

    comptesInternes.typeComptesId = this.comptesInternesFromGroup.get('typeComptes').value;
    this.comptesInternesServices.addComptesInternes(comptesInternes).subscribe(res => {
      this.dialogRef.close({result: 1});
    });
  }
}
