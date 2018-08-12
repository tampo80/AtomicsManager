import { Component, OnInit, Inject } from '@angular/core';
import { Categories } from '../../../../models/categories';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormErrorStateMatcher } from '../../../../formErrorStateMatcher/form-error-state-matcher';

import { Articles } from '../../../../models/articles';
import { ArticlesService } from '../../../../services/articles.service';
import { CategoriesService } from '../../../../services/categories.service';
import { MessageboxService } from '../../../../services/messagebox.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { FournisseursService } from '../../../../services/fournisseurs.service';
import { Fournisseurs } from '../../../../models/fournisseurs.model';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ConfigService } from '../../../../services/config.service';
import { ImagesService } from '../../../../services/images.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEventType } from '@angular/common/http';
import { ImageCopperComponent } from '../../image-copper/image-copper.component';
import { DEFAULTIMG } from '../../../../config';
import { ImageUtils } from '../../image-utils';



@Component({
  selector: 'app-add-articles-dialog',
  templateUrl: './add-articles-dialog.component.html',
  styleUrls: ['./add-articles-dialog.component.scss']
})
export class AddArticlesDialogComponent implements OnInit {


    formData: FormData;
    imageToShow: any;
    isImageLoading: boolean;
    selectedFile: File;
    uploadProgress = 0;
    filteredCategories: Observable<Categories[]>;
    filteredFournisseurs: Observable<Fournisseurs[]>;
    isVillesLoading = false;
    lesCategories: Categories[] = [];
    lesFournisseurs: Fournisseurs[] = [];
    ArticlesForm: FormGroup;
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
      categories: '',
      description: '',
      buyingPrice: '',

    };

    matcher = new FormErrorStateMatcher();
    devises: string;

    datas: any;



    imageChangedEvent: any = '';
    croppedImage: any = '';
    cropperReady = false;

    constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private imageService: ImagesService, private domSanitize: DomSanitizer,  private fournisseursServces: FournisseursService, private messageboxService: MessageboxService, public articlesService: ArticlesService, private categoriesServices: CategoriesService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddArticlesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      data.articles = new Articles();
     this.devises = ConfigService.Devise;
     // this.selectedFile=new Blob();
     this.imageToShow = domSanitize.bypassSecurityTrustUrl(DEFAULTIMG);
     this.selectedFile = ImageUtils.toBlob(DEFAULTIMG, 'default.png');
     console.log(this.selectedFile);
    }

    ngOnInit() {

  this.getfournisseurs();
  this.getCategories();
  this.createForm();
  this.onValueChanged();

  this.filteredCategories = this.ArticlesForm.get('categories').valueChanges.pipe(
    startWith<string|Categories>(''),
    map(value => typeof value === 'string' ? value : value.name),
    map(name => name ? this._filterCateGories(name) : this.lesCategories.slice())
  );

  this.filteredFournisseurs = this.ArticlesForm.get('fournisseurs').valueChanges.pipe(
    startWith<string|Fournisseurs>(''),
    map(value => typeof value === 'string' ? value : value.titre),
    map(name => name ? this._filterFournisseurs(name) : this.lesFournisseurs.slice())
  );

    }

    createImageFromBlob(image: Blob) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        console.log(reader.result);
         this.imageToShow = this.domSanitize.bypassSecurityTrustUrl(reader.result);
      }, false);

      if (image) {
         reader.readAsDataURL(image);
      }
     }

     getImageFromService() {
         this.isImageLoading = true;
         this.imageService.getImage(this.imgUrl).subscribe(data => {
           this.imageToShow = data;
           this.isImageLoading = false;

         }, error => {
           this.isImageLoading = false;
           console.log(error);
         });
     }

    getCategories() {
      this.categoriesServices.getCategories().subscribe(res =>  {
          this.lesCategories = res;
      });
    }

    _filterCateGories(value: string): Categories[] {
      const filterValue = value.toLowerCase();

      return this.lesCategories.filter(option => option.name.toLowerCase().indexOf(filterValue) !== -1);
    }

    _filterFournisseurs(value: string): Fournisseurs[] {
      const filterValue = value.toLowerCase();

      return this.lesFournisseurs.filter(option => option.titre.toLowerCase().indexOf(filterValue) !== -1);
    }

    getfournisseurs() {
      this.fournisseursServces.getFournisseurs().subscribe(res =>  {
          this.lesFournisseurs = res;
      });
    }

  createForm() {
    this.ArticlesForm = this.fb.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
        categories: ['', Validators.required],
        buyingPrice: ['', Validators.required],
        fournisseurs: ['', Validators.required],
        icone: [''],
      });

      this.ArticlesForm.valueChanges.subscribe(data => {this.onValueChanged(data); });
      this.onValueChanged();
  }
   onNoClick(): void {
    this.dialogRef.close({result: 0});
  }

  onSubmit() {
    //  alert("p");
    const articles: Articles = new Articles();

    articles.productCategoryId = this.ArticlesForm.get('categories').value.id;
    articles.name = this.ArticlesForm.get('name').value;
    articles.description = this.ArticlesForm.get('description').value;
    articles.fournisseursId = this.ArticlesForm.get('fournisseurs').value.id;
    articles.buyingPrice = this.ArticlesForm.get('buyingPrice').value;

     this.formData = new FormData();
    this.formData.append('iIcon', this.selectedFile, this.selectedFile.name);
    this.formData.append('productCategoryId', articles.productCategoryId.toString());
    this.formData.append('name', articles.name);
    this.formData.append('description', articles.description);
    this.formData.append('fournisseursId', articles.fournisseursId.toString());

    this.formData.append('buyingPrice', articles.buyingPrice);


    this.articlesService.addArticles( this.formData).subscribe(

      /* res=>{


        this.dialogRef.close({result:1});

       },
     err=>{

       if (err.statuts===400) {
        // this.erroMessage=err.error;
         this.messageboxService.ShowMessage("Avertissement","des erreurs empechent l'enregistrement "+err.error,"",0,false,1,'520px',"warning",'warn')
       }

         } */

         event =>  {

          if (event.type === HttpEventType.UploadProgress) {
             this.uploadProgress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            // this.getImageFromService();
            this.snackbar.open('Information mis à jour avec succés !', 'LOGO', {
              duration: 4000
            });
            this.uploadProgress = 0;
            this.selectedFile = null;
            this.dialogRef.close({result: 1});

          }


         }
    );
     }



    displayFn2(fournisseurs?: Fournisseurs): string | undefined {
      return fournisseurs ? fournisseurs.titre : undefined;
    }

    displayFn(categories?: Categories): string | undefined {
      return categories ? categories.name : undefined;
    }

    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      this.imageToShow = null;
      this.createImageFromBlob(this.selectedFile);
    }


  fileChangeEvent(event: any): void {
    this.selectedFile = event.target.files[0];
    this.isImageLoading = true;
      this.imageChangedEvent = event;
  }
  imageCroppedBase64(image: string) {
    console.log(image);
      this.croppedImage = image;
  }

  imageCroppedFile(image: File) {
    this.selectedFile = image;
  }
  imageLoaded() {
    this.cropperReady = true;
    this.isImageLoading = false;
  }
  imageLoadFailed () {
    console.log('Load failed');
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



    croppe() {

      const dialogRef = this.dialog.open(ImageCopperComponent, {
        data: {articles: ''},
        width: '800px',
       disableClose: true
      });

      dialogRef.afterClosed().subscribe(res =>  {
        console.log(res);
        if (res.result !== 0) {

          this.imageToShow = res.result.base64;
          console.log(this.imageToShow);
          this.selectedFile = res.result.blob;
        }
      }


      );
    }
  }
