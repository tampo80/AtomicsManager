import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { VillesService } from '../../../../../services/villes.service';
import { Villes } from '../../../../../models/villes';
import { PaysService } from '../../../../../services/pays.service';
import { Pays } from '../../../../../models/pays.model';

@Component({
  selector: 'app-add-villes-dialog',
  templateUrl: './add-villes-dialog.component.html',
  styleUrls: ['./add-villes-dialog.component.scss']
})
export class AddVillesDialogComponent implements OnInit {

  villesForm: FormGroup;
  Pays: Pays[];
  constructor(private messageboxService: MessageboxService, public villeService: VillesService, private paysService: PaysService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddVillesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    data.villes = new Villes();
  }

  ngOnInit() {
    this.getPays();
    this.villesForm = this.fb.group(
      {
        name: ['', Validators.required],
        paysId: ['', Validators.required]

      }
    );
  }
 getPays() {
   this.paysService.getPays().subscribe(res =>  {
    this.Pays = res;
   }

   );
 }
 onNoClick(): void {
  this.dialogRef.close({result: 0});
}

onSubmit() {
  //  alert("p");
  this.villeService.addVilles(this.villesForm.value).subscribe(

    res =>  {


      this.dialogRef.close({result: 1});

     },
   err =>  {

     if (err.statuts === 400) {
      // this.erroMessage=err.error;
       this.messageboxService.ShowMessage('Avertissement', 'des erreurs empechent l\'enregistrement ' + err.error, '', 0, false, 1, '520px', 'warning', 'warn');
     }

       }
  );
   }
}
