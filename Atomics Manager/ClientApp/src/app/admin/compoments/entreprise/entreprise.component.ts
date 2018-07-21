import { Component, OnInit } from '@angular/core';
import { Entreprise } from '../../models/entreprise-model';
import { EntrepriseService } from '../../services/entreprise.service';
import { FormBuilder, FormGroup, Validators } from '../../../../../node_modules/@angular/forms';
import { FormeJuridique } from '../../models/forme-juridique';
import { FORME_JURIDIQUE } from '../../config';
import { MatSnackBar } from '../../../../../node_modules/@angular/material';
import { ImagesService } from '../../services/images.service';
import { ConfigService } from '../../services/config.service';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';


@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit {

  EntrepriseForm:FormGroup;
  formeJuridique:FormeJuridique[];
  imgUrl: string =ConfigService.rootUrl+ '/api/entreprise/getlogo';

  imageToShow: any;
  isImageLoading: boolean;
  selectedFile: File;

  constructor( private domSanitaize:DomSanitizer, private entrepriseService:EntrepriseService,private fb:FormBuilder,private imageService:ImagesService,private snackbar:MatSnackBar) {
    this.formeJuridique=FORME_JURIDIQUE;
    this.createForm();
    this.getEntreprise();
    this.getImageFromService();
  }
  entrepries:Entreprise;


  ngOnInit() {

  }
createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
     console.log(reader.result);
      this.imageToShow =this.domSanitaize.bypassSecurityTrustUrl(reader.result);
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
  }

  getImageFromService() {
      this.isImageLoading = true;
      this.imageService.getImage(this.imgUrl).subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;

      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
  }

  onSubmit()
  {
         this.entrepries.id=this.EntrepriseForm.get("id").value;
         this.entrepries.titre=this.EntrepriseForm.get("titre").value;
         this.entrepries.name=this.EntrepriseForm.get("name").value;
         this.entrepries.email=this.EntrepriseForm.get("email").value;
         this.entrepries.webSite=this.EntrepriseForm.get("webSite").value;
         this.entrepries.adresse=this.EntrepriseForm.get("adresse").value;
         this.entrepries.tel=this.EntrepriseForm.get("tel").value;
         this.entrepries.formeJuridique=this.EntrepriseForm.get("formeJuridique").value;

    this.entrepriseService.updateEntreprises(this.entrepries).subscribe(res=>{
      this.snackbar.open('Information mis à jour avec succés !','Mise à jour',{
        duration:4000
      });
    }
    );

  }

  createForm()
  {
    this.EntrepriseForm=this.fb.group(
      {
       id :['',Validators.required],
       titre :['',Validators.required],
       name :['',Validators.required],
       email :['',Validators.required],
       webSite :['',Validators.required],
       tel :['',Validators.required],
       adresse :['',Validators.required],

       formeJuridique:['',Validators.required]
    }
  )
  }


  getEntreprise()
  {
    this.entrepriseService.getEntreprises().subscribe(res=>
      {
         this.entrepries=res;
         this.EntrepriseForm.get("id").setValue(res.id);
         this.EntrepriseForm.get("titre").setValue(res.titre);
         this.EntrepriseForm.get("name").setValue(res.name);
         this.EntrepriseForm.get("email").setValue(res.email);
         this.EntrepriseForm.get("webSite").setValue(res.webSite);
         this.EntrepriseForm.get("adresse").setValue(res.adresse);
         this.EntrepriseForm.get("tel").setValue(res.tel);
         this.EntrepriseForm.get("formeJuridique").setValue(res.formeJuridique);
      }
    );
  }
  compareRoles=(role1:string,role2:string)=>role1==role2;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append('id',this.entrepries.id.toString());
    uploadData.append('logo', this.selectedFile, this.selectedFile.name);

   this.entrepriseService.uploadLogo(uploadData).subscribe(event=>{
    console.log(event);
   }

  );
  }

}
