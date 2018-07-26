import { Component, OnInit, Inject } from '@angular/core';
import { Categories } from '../../../../models/categories';
import { FormGroup, Validators, FormBuilder } from '../../../../../../../node_modules/@angular/forms';
import { FormErrorStateMatcher } from '../../../../formErrorStateMatcher/form-error-state-matcher';

import { Articles } from '../../../../models/articles';
import { ArticlesService } from '../../../../services/articles.service';
import { CategoriesService } from '../../../../services/categories.service';
import { MessageboxService } from '../../../../services/messagebox.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../../node_modules/@angular/material';
import { FournisseursService } from '../../../../services/fournisseurs.service';
import { Fournisseurs } from '../../../../models/fournisseurs.model';

@Component({
  selector: 'app-add-articles-dialog',
  templateUrl: './add-articles-dialog.component.html',
  styleUrls: ['./add-articles-dialog.component.scss']
})
export class AddArticlesDialogComponent implements OnInit {


    isVillesLoading=false;
    lesCategories:Categories[];
    lesFournisseurs:Fournisseurs[];
    ArticlesForm:FormGroup;
    validationMessages = {

      name: {
        required: 'Ce champ ne peu pas pas étre vide !',

      },
      categories: {
        required: 'Ce champ ne peu pas pas étre vide !',

      },
      description: {
        required: 'Ce champ ne peu pas pas étre vide !',

      }
    };
    formErrors = {

      name: '',
      categories:'',
      description:'',


    };
    matcher = new FormErrorStateMatcher();

    constructor(private fournisseursServces:FournisseursService, private messageboxService:MessageboxService,public articlesService:ArticlesService,private categoriesArticles:CategoriesService, private fb: FormBuilder,public dialogRef: MatDialogRef<AddArticlesDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
      data.articles=new Articles();

    }

    ngOnInit() {

this.getfournisseurs();
  this.createForm();
  this.onValueChanged();
  this.getCategories();

    }


    getCategories()
    {
      this.categoriesArticles.getCategories().subscribe(res=>{
          this.lesCategories=res;
      })
    }

    getfournisseurs()
    {
      this.fournisseursServces.getFournisseurs().subscribe(res=>{
          this.lesFournisseurs=res;
      })
    }

  createForm()
  {
    this.ArticlesForm=this.fb.group(
      {
        name:['',Validators.required],
        description:['',Validators.required],
        categories:['',Validators.required],
        buyingPrice:['',Validators.required],
        fournisseurs:['',Validators.required],
        icone:['',Validators.required],
      });

      this.ArticlesForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
  }
   onNoClick(): void {
    this.dialogRef.close({result:0});;
  }

  onSubmit() {
    //  alert("p");
    let articles:Articles=new Articles();

    articles.ProductCategoryId=this.ArticlesForm.get('categories').value;
    articles.name=this.ArticlesForm.get('name').value;
    articles.description=this.ArticlesForm.get('description').value;

    this.articlesService.addArticles(articles).subscribe(

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




     onValueChanged(data?: any) {
      if (!this.createForm) {
        return;
      }
      const form = this.ArticlesForm;
      for (const field in this.formErrors) {
        if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }
  }
