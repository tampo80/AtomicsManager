import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Categories } from '../../../../../models/categories';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { CategoriesService } from '../../../../../services/categories.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-categories-dialog',
  templateUrl: './edit-categories-dialog.component.html',
  styleUrls: ['./edit-categories-dialog.component.scss']
})
export class EditCategoriesDialogComponent implements OnInit {
  categoriesForm:FormGroup;


  constructor(private messageboxService:MessageboxService,public categoriesService:CategoriesService, private fb: FormBuilder,public dialogRef: MatDialogRef<EditCategoriesDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {


   }


   get f() { return this.categoriesForm.controls; }

ngOnInit() {
this.categoriesForm=this.fb.group(
{ id:[ this.data.categories.id,Validators.required],
  name:[ this.data.categories.name,Validators.required],
  description:[this.data.categories.description,Validators.required]
}
)


  }





  isExcite(categoriesName:string)
  {

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Champ réquis' :
      this.formControl.hasError('name') ? "Mail n'est pas valide" :
        '';
  }
  onSubmit() {
   //  alert("p");
   this.addCategories();
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





    addCategories()
    {
      //this.data.role.permissions=this.getSelectedPermissions();
      this.categoriesService.updateCategories(this.categoriesForm.value).subscribe(

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
