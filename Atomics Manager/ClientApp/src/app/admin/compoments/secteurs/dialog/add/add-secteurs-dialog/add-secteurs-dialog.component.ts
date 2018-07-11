import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { SecteursService } from '../../../../../services/secteurs.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Secteurs } from '../../../../../models/secteurs';

@Component({
  selector: 'app-add-secteurs-dialog',
  templateUrl: './add-secteurs-dialog.component.html',
  styleUrls: ['./add-secteurs-dialog.component.scss']
})
export class AddSecteursDialogComponent implements OnInit {

  secteursForm:FormGroup;


  constructor(private messageboxService:MessageboxService,public secteursService:SecteursService, private fb: FormBuilder,public dialogRef: MatDialogRef<AddSecteursDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {

    data.secteurs=new Secteurs();
   }


   get f() { return this.secteursForm.controls; }

ngOnInit() {
this.secteursForm=this.fb.group(
{
  name:['',Validators.required],
  description:['',Validators.required]  
}
)


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
      this.secteursService.addSecteurs(this.secteursForm.value).subscribe(
  
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
