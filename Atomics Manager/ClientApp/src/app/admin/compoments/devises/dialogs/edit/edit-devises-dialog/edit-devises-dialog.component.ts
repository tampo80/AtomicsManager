import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { DevisesService } from '../../../../../services/devises.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddDevisesDialogComponent } from '../../add/add-devises-dialog/add-devises-dialog.component';
import { Devises } from '../../../../../models/devises';

@Component({
  selector: 'app-edit-devises-dialog',
  templateUrl: './edit-devises-dialog.component.html',
  styleUrls: ['./edit-devises-dialog.component.scss']
})
export class EditDevisesDialogComponent implements OnInit {

  devisesForm:FormGroup;


  constructor(private messageboxService:MessageboxService,public devisesService:DevisesService, private fb: FormBuilder,public dialogRef: MatDialogRef<EditDevisesDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {

   // data.devises=new Devises();
   }


   get f() { return this.devisesForm.controls; }

ngOnInit() {
this.devisesForm=this.fb.group(
{
  id:[this.data.devises.id,Validators.required],
  label:[this.data.devises.label,Validators.required],
  codeIso:[this.data.devises.codeIso,Validators.required],
  symbole:[this.data.devises.symbole,Validators.required]
}

);


  }





  isExcite(devisesName:string)
  {

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Champ réquis' :
      this.formControl.hasError('name') ? "Mail n'est pas valide" :
        '';
  }
  onSubmit() {
   //  alert("p");
   this.addDevises();
    }
  
    onNoClick(): void {
      this.dialogRef.close({result:0});;
    }
    formControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ],
  this.isExcite.bind(this)
  );



  
    
    addDevises()
    {
      //this.data.role.permissions=this.getSelectedPermissions();
      this.devisesService.updateDevises(this.devisesForm.value).subscribe(
  
        res=>{
       
        
          this.dialogRef.close({result:1});
           
         },
       err=>{
        
         if (err.statuts===400) {
          // this.erroMessage=err.error;
           this.messageboxService.ShowMessage("Avertissement","des erreurs empechent l'enregistrement "+err.error,"",0,false,1,'520px',"warning",'warn')
         }
              
           }  
      );
    }
}
