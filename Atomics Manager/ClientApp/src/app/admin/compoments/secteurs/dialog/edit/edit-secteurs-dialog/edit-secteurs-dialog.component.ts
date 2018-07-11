import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { SecteursService } from '../../../../../services/secteurs.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-secteurs-dialog',
  templateUrl: './edit-secteurs-dialog.component.html',
  styleUrls: ['./edit-secteurs-dialog.component.scss']
})
export class EditSecteursDialogComponent implements OnInit {

  secteursForm:FormGroup;


  constructor(private messageboxService:MessageboxService,public secteursService:SecteursService, private fb: FormBuilder,public dialogRef: MatDialogRef<EditSecteursDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {

   // data.secteurs=new Secteurs();
   }


   get f() { return this.secteursForm.controls; }

ngOnInit() {
this.secteursForm=this.fb.group(
{
  id:[this.data.secteurs.id,Validators.required],
  name:[this.data.secteurs.name,Validators.required],
  description:[this.data.secteurs.description,Validators.required],
  
}

);


  }





  isExcite(secteursName:string)
  {

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Champ réquis' :
      this.formControl.hasError('name') ? "Mail n'est pas valide" :
        '';
  }
  onSubmit() {
   //  alert("p");
   this.addSecteurs();
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



  
    
    addSecteurs()
    {
      //this.data.role.permissions=this.getSelectedPermissions();
      this.secteursService.updateSecteurs(this.secteursForm.value).subscribe(
  
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
