import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { PaysService } from '../../../../../services/pays.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Pays } from '../../../../../models/pays.model';
import { AsyncUniqueValidator } from '../../../../../validators/async-unique-validator';

@Component({
  selector: 'app-add-pays-dialog',
  templateUrl: './add-pays-dialog.component.html',
  styleUrls: ['./add-pays-dialog.component.scss']
})
export class AddPaysDialogComponent implements OnInit {
  paysForm: FormGroup;


  constructor(private messageboxService: MessageboxService, public paysService: PaysService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddPaysDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    data.pays = new Pays();
   }


   get f() { return this.paysForm.controls; }

ngOnInit() {
this.paysForm = this.fb.group(
{
  name: ['', Validators.required, AsyncUniqueValidator.createValidator(this.paysService)],
  codePays: ['', Validators.required]
}

);


  }





  isExcite(paysName: string) {

  }


  onSubmit() {
   //  alert("p");
   this.addPays();
    }

    onNoClick(): void {
      this.dialogRef.close({result: 0});
    }





    addPays() {
      // this.data.role.permissions=this.getSelectedPermissions();
      this.paysService.addPays(this.paysForm.value).subscribe(

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
