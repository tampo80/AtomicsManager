import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from '../../../../../../../node_modules/rxjs';
import { Categories } from '../../../../models/categories';
import { Fournisseurs } from '../../../../models/fournisseurs.model';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../node_modules/@angular/forms';
import { ConfigService } from '../../../../services/config.service';
import { FormErrorStateMatcher } from '../../../../formErrorStateMatcher/form-error-state-matcher';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../../node_modules/@angular/material';
import { Articles } from '../../../../models/articles';
import { ImagesService } from '../../../../services/images.service';
import { DomSanitizer } from '../../../../../../../node_modules/@angular/platform-browser';
import { FournisseursService } from '../../../../services/fournisseurs.service';
import { MessageboxService } from '../../../../services/messagebox.service';
import { ArticlesService } from '../../../../services/articles.service';
import { CategoriesService } from '../../../../services/categories.service';
import { startWith, map } from '../../../../../../../node_modules/rxjs/operators';
import { HttpEventType } from '../../../../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-edit-articles-dialog',
  templateUrl: './edit-articles-dialog.component.html',
  styleUrls: ['./edit-articles-dialog.component.scss']
})
export class EditArticlesDialogComponent implements OnInit {

  formData:FormData;
  imageToShow: any;
  isImageLoading: boolean;
  selectedFile: File;
  uploadProgress:number=0;
  filteredCategories: Observable<Categories[]>;
  filteredFournisseurs: Observable<Fournisseurs[]>;
  isVillesLoading=false;
  lesCategories:Categories[]=[];
  lesFournisseurs:Fournisseurs[]=[];
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

  imgUrl: string = ConfigService.rootUrl + '/api/entreprise/getlogo';
  formErrors = {

    name: '',
    categories:'',
    description:'',
    buyingPrice:'',

  };
MatSnackBar
  matcher = new FormErrorStateMatcher();
  devises:string;MatDialogRef
  constructor(private snackbar:MatSnackBar, private imageService:ImagesService,private domSanitize:DomSanitizer,  private fournisseursServces:FournisseursService, private messageboxService:MessageboxService,public articlesService:ArticlesService,private categoriesServices:CategoriesService, private fb: FormBuilder,public dialogRef: MatDialogRef<EditArticlesDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    //data.articles=new Articles();
   this.devises=ConfigService.Devise;
  }

  ngOnInit() {

this.getfournisseurs();
this.getCategories();
this.createForm();
this.onValueChanged();

this.filteredCategories = this.ArticlesForm.get("categories").valueChanges.pipe(
  startWith<string|Categories>(''),
  map(value => typeof value === 'string' ? value : value.name),
  map(name => name ? this._filterCateGories(name) : this.lesCategories.slice())
);

this.filteredFournisseurs = this.ArticlesForm.get("fournisseurs").valueChanges.pipe(
  startWith<string|Fournisseurs>(''),
  map(value => typeof value === 'string' ? value : value.titre),
  map(name => name ? this._filterFournisseurs(name) : this.lesFournisseurs.slice())
);
this.imageToShow=this.domSanitize.bypassSecurityTrustUrl(this.data.articles.sicone);
console.log(this.imageToShow);
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log(reader.result);
       this.imageToShow =this.domSanitize.bypassSecurityTrustUrl(reader.result);
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
   }

   getImageFromService() {
       this.isImageLoading = true;
       this.imageService.getImage(this.imgUrl).subscribe(data => {
         this.imageToShow=data;
         this.isImageLoading = false;

       }, error => {
         this.isImageLoading = false;
         console.log(error);
       });
   }

  getCategories()
  {
    this.categoriesServices.getCategories().subscribe(res=>{
        this.lesCategories=res;
        const cat:Categories=this.getSelectedCategorie(this.data.articles.productCategoryId);
        console.log(cat);
        this.ArticlesForm.get("categories").setValue(this.getSelectedCategorie(this.data.articles.productCategoryId));


    })
  }

  _filterCateGories(value: string): Categories[] {
    const filterValue = value.toLowerCase();

    return this.lesCategories.filter(option => option.name.toLowerCase().indexOf(filterValue) !== -1);
  }

  _filterFournisseurs(value: string): Fournisseurs[] {
    const filterValue = value.toLowerCase();

    return this.lesFournisseurs.filter(option => option.titre.toLowerCase().indexOf(filterValue) !== -1);
  }

  getfournisseurs()
  {
    this.fournisseursServces.getFournisseurs().subscribe(res=>{
        this.lesFournisseurs=res;
        this.ArticlesForm.get("fournisseurs").setValue(this.getSelectedFourniseurs(this.data.articles.fournisseursId));

    })
  }

createForm()
{
  this.ArticlesForm=this.fb.group(
    {
      name:[this.data.articles.name,Validators.required],
      description:[this.data.articles.description,Validators.required],
      categories:[this.getSelectedCategorie(this.data.articles.productCategoryId),Validators.required],
      buyingPrice:[this.data.articles.buyingPrice,Validators.required],
      fournisseurs:[this.getSelectedFourniseurs(this.data.articles.fournisseursId),Validators.required],
      icone:[this.data.articles.icone],
    });

    this.ArticlesForm.valueChanges.subscribe(data => {this.onValueChanged(data);});
    this.onValueChanged();
}
 onNoClick(): void {
  this.dialogRef.close({result:0});;
}

getSelectedCategorie(Id:any)
{
  return this.lesCategories.find(e=>e.id==Id);
}

getSelectedFourniseurs(Id:any)
{
  return this.lesFournisseurs.find(e=>e.id==Id);
}


onSubmit() {
  //  alert("p");
  let articles:Articles=new Articles();

  articles.productCategoryId=this.ArticlesForm.get('categories').value.id;
  articles.name=this.ArticlesForm.get('name').value;
  articles.description=this.ArticlesForm.get('description').value;
  articles.fournisseursId=this.ArticlesForm.get('fournisseurs').value.id;
  articles.buyingPrice=this.ArticlesForm.get('buyingPrice').value;

   this.formData=new FormData();
   if (this.selectedFile) {
    this.formData.append('iIcon',this.selectedFile,this.selectedFile.name);
   }
   this.formData.append('id',this.data.articles.id);
  this.formData.append('productCategoryId',articles.productCategoryId.toString());
  this.formData.append('name',articles.name);
  this.formData.append('description',articles.description);
  this.formData.append('fournisseursId',articles.fournisseursId.toString());

  this.formData.append('buyingPrice',articles.buyingPrice);


  this.articlesService.updateArticles( this.formData,this.data.articles.id).subscribe(

    /* res=>{


      this.dialogRef.close({result:1});

     },
   err=>{

     if (err.statuts===400) {
      // this.erroMessage=err.error;
       this.messageboxService.ShowMessage("Avertissement","des erreurs empechent l'enregistrement "+err.error,"",0,false,1,'520px',"warning",'warn')
     }

       } */

       event=>{

        if (event.type==HttpEventType.UploadProgress) {
           this.uploadProgress=Math.round(100 * event.loaded / event.total);
        }else if (event.type==HttpEventType.Response) {
          //this.getImageFromService();
          this.snackbar.open('Information mis à jour avec succés !','LOGO',{
            duration:4000
          });
          this.uploadProgress=0;
          this.selectedFile=null;
          this.dialogRef.close({result:1});

        }


       }
  );
   }

   displayFn(categories?: Categories): string | undefined {
    return categories ? categories.name : undefined;
  }

  displayFn2(fournisseurs?: Fournisseurs): string | undefined {
    return fournisseurs ? fournisseurs.titre : undefined;
  }


  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    this.imageToShow=null;
    this.createImageFromBlob(this.selectedFile);
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
