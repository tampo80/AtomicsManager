import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Categories } from '../../../../../models/categories';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { CategoriesService } from '../../../../../services/categories.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-categories-dialog',
  templateUrl: './add-categories-dialog.component.html',
  styleUrls: ['./add-categories-dialog.component.scss']
})
export class AddCategoriesDialogComponent implements OnInit {

  categoriesForm: FormGroup;


  constructor(private messageboxService: MessageboxService, public categoriesService: CategoriesService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddCategoriesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    data.categories = new Categories();
   }


   get f() { return this.categoriesForm.controls; }

ngOnInit() {
this.categoriesForm = this.fb.group(
{
  name: ['', Validators.required],
  description: ['', Validators.required]
}
);


  }





  isExcite(categoriesName: string) {

  }


  onSubmit() {
   //  alert("p");
   this.addCategories();
    }

    onNoClick(): void {
      this.dialogRef.close({result: 0});
    }






    addCategories() {
      // this.data.role.permissions=this.getSelectedPermissions();
      this.categoriesService.addCategories(this.categoriesForm.value).subscribe(

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
