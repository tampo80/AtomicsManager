import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PaysService } from '../../../../../services/pays.service';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-pays-dialog',
  templateUrl: './edit-pays-dialog.component.html',
  styleUrls: ['./edit-pays-dialog.component.scss']
})
export class EditPaysDialogComponent implements OnInit {

  constructor(private messageboxService: MessageboxService, public paysService: PaysService, public dialogRef: MatDialogRef<EditPaysDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  submit() {
    // emppty stuff
    }

    onNoClick(): void {
      this.dialogRef.close({result: 0});
    }

    addPays() {
      // this.data.role.permissions=this.getSelectedPermissions();
      this.paysService.updatePays(this.data.pays).subscribe(

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
