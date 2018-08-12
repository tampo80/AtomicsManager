import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { DevisesService } from '../../../../../services/devises.service';
import { Devises } from '../../../../../models/devises';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AsyncUniqueValidator } from '../../../../../validators/async-unique-validator';

@Component({
  selector: 'app-add-devises-dialog',
  templateUrl: './add-devises-dialog.component.html',
  styleUrls: ['./add-devises-dialog.component.scss']
})
export class AddDevisesDialogComponent implements OnInit {

  devisesForm: FormGroup;


  constructor(private messageboxService: MessageboxService, public devisesService: DevisesService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddDevisesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    data.devises = new Devises();
   }


   get f() { return this.devisesForm.controls; }

ngOnInit() {
this.devisesForm = this.fb.group(
{
  label: ['', Validators.required],
  codeIso: ['', Validators.required],
  symbole: ['', Validators.required]
}

);


  }





  isExcite(devisesName: string) {

  }


  onSubmit() {
   //  alert("p");
   this.addDevises();
    }

    onNoClick(): void {
      this.dialogRef.close({result: 0});
    }





    addDevises() {
      // this.data.role.permissions=this.getSelectedPermissions();
      this.devisesService.addDevises(this.devisesForm.value).subscribe(

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
