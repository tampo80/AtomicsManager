import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Devises } from '../../../../../models/devises';
import { Secteurs } from '../../../../../models/secteurs';
import { Pays } from '../../../../../models/pays.model';
import { Villes } from '../../../../../models/villes';
import { FileInformation } from '../../../../../models/file-information';
import { TypePayements } from '../../../../../models/type-payements';
import { FormeJuridique } from '../../../../../models/forme-juridique';
import { FormErrorStateMatcher } from '../../../../../formErrorStateMatcher/form-error-state-matcher';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { FournisseursService } from '../../../../../services/fournisseurs.service';
import { SecteursService } from '../../../../../services/secteurs.service';
import { DevisesService } from '../../../../../services/devises.service';
import { PaysService } from '../../../../../services/pays.service';
import { VillesService } from '../../../../../services/villes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditFournisseurs } from '../../../../../models/edit-fournisseurs';

@Component({
  selector: 'app-edit-fournisseurs-dialog',
  templateUrl: './edit-fournisseurs-dialog.component.html',
  styleUrls: ['./edit-fournisseurs-dialog.component.scss']
})
export class EditFournisseursDialogComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput: ElementRef;
  isLinear = false;
  isVillesLoading=false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thiredFormGroup: FormGroup;
  devises:Devises[];
  secteurs:Secteurs[];
  lesPays:Pays[];
  villesParPays:Villes[];
  villesParPaysbk:Villes[];



  file: File;

  fileInformation: FileInformation;

  typePayement:TypePayements[]=[
    {
      value:0,Label:"Espèces"
    },
    {
      value:1,Label:"Chèque"
    },
    {
      value:2,Label:"Virement bancaire"
    }

   

  ];
  formeJuridiques:FormeJuridique[]=[
    {
      value:0,label:"EURL"
    },
    {
      value:1,label:"SARL"
    },
    {
      value:2,label:"SELAR"
    },
    {
      value:3,label:"SA"
    }
    ,
    {
      value:4,label:"SAS"
    }
    ,
    {
      value:3,label:"SASU"
    },
    {
      value:4,label:"SNC"
    }
    ,
    {
      value:5,label:"SCP"
    }
    
    
    
  ];

  matcher = new FormErrorStateMatcher();


  formErrors = {
    titre: '',
    nomSociete: '',
    formeJuridique: '',
    secteurs:'',
    contract:'',
    devises:'',
    nomDg:'',
    telDg:'',
    phoneNumber:'',
    email:'',
    emailbk:'',
    emailcommande:'',
    tel:'',
    telCommande:'',
    codePostale:'',
    adresse:'',
    paysbk:'',
    pays:'',
    ville:'',
    villebk:'',
    bankName:'',
    accountName:'',
    accountNumber:'',
    iban:'',
    adressebk:'',
    typePayement:'',
    
  };
  validationMessages = {
    titre: {       required: 'Le titre de la société ne peu pas être vide !' 	  },
    nomSociete: {       required: 'Le nom de la société ne peu pas être vide !' 	  },
    formeJuridique: {       required: 'La forme juridique doit être rensiengnée !' 	  },
    secteurs:{       required: 'Ce champs est obligatoir !' 	  },
    contract:{       required: 'Ce champs est obligatoir !'  	  },
    devises:{       required: 'Ce champs est obligatoir !'  	  },
    nomDg:{       required: 'Ce champs est obligatoir !'  	  },
    telDg:{       required: 'Ce champs est obligatoir !'  	  },
    phoneNumber:{       required: 'Ce champs est obligatoir !'  	  },
    email:{       
      required: 'Ce champs est obligatoir !' ,
      email:"L'adresse de messagerie n'est pas valide !" 	  },
    emailbk:{      
      required: 'Ce champs est obligatoir !' ,
      email:"L'adresse de messagerie n'est pas valide !" 	  },
    emailcommande:{       
      required: 'Ce champs est obligatoir !',
      email:"L'adresse de messagerie n'est pas valide !" 	  },  	 
    tel:{       required: 'Ce champs est obligatoir !'  	  },
    telCommande:{       required: 'Ce champs est obligatoir !'  	  },
    codePostale:{       required: 'Ce champs est obligatoir !'  	  },
    adresse:{       required: 'Ce champs est obligatoir !'  	  },
    paysbk:{       required: 'Ce champs est obligatoir !'  	  },
    pays:{       required: 'Ce champs est obligatoir !'  	  },
    ville:{       required: 'Ce champs est obligatoir !'  	  },
    villebk:{       required: 'Ce champs est obligatoir !'  	  },
    bankName:{       required: 'Ce champs est obligatoir !'  	  },
    accountName:{       required: 'Ce champs est obligatoir !'  	  },
    accountNumber:{       required: 'Ce champs est obligatoir !'  	  },
    iban:{       required: 'Ce champs est obligatoir !'  	  },
    adressebk:{       required: 'Ce champs est obligatoir !'  	  },
    typePayement:{       required: 'Ce champs est obligatoir !'  	  },
  };

   fournisseur:EditFournisseurs=new EditFournisseurs();
  constructor(private messageboxService:MessageboxService, private fourniseurService:FournisseursService, private devisesService:DevisesService,private sercteursService:SecteursService,private paysServices:PaysService,private villesServices:VillesService, private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<EditFournisseursDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any)
   {
    this.fournisseur=data.fournisseurs;
    this.getDevise();
    this.getSecteurs();
    this.getPays();
    
   }
  
 
  ngOnInit() {
   
    
    this.createForm();
   
    this.getVillesByPaysId(this.data.fournisseurs.pays.id);
    this.getVillesByPaysIdbk(this.data.fournisseurs.paysbk.id);
  }


createForm()
{
  this.firstFormGroup = this._formBuilder.group({
    titre:[this.data.fournisseurs.titre,Validators.required],
    nomSociete:[this.data.fournisseurs.nomSociete,Validators.required],
    formeJuridique:[this.data.fournisseurs.formeJuridique,Validators.required],
    secteurs: [this.data.fournisseurs.secteurs, Validators.required],
    contract:[''],
    devises:[this.data.fournisseurs.devises.id,Validators.required],
    nomDg:[this.data.fournisseurs.nomDg,[Validators.required]],
    telDg:[this.data.fournisseurs.telDg,[Validators.required]]

  });
  this.secondFormGroup = this._formBuilder.group({
    
    phoneNumber:[this.data.fournisseurs.phoneNumber,[Validators.required]],
    email:[this.data.fournisseurs.email,[Validators.required,Validators.email]],
    emailcommande:[this.data.fournisseurs.emailcommande,[Validators.required,Validators.email]],
    telCommande:[this.data.fournisseurs.telCommande,[Validators.required]],
    codePostale:[this.data.fournisseurs.codePostale,[Validators.required]],
    adresse:[this.data.fournisseurs.adresse,[Validators.required]],
   
    pays:[this.data.fournisseurs.pays.id,[Validators.required]],
    ville:[this.data.fournisseurs.villes.id,[Validators.required]],
   
  });
  this.thiredFormGroup = this._formBuilder.group({
    bankName:[this.data.fournisseurs.bankName,[Validators.required]],
    accountNumber:[this.data.fournisseurs.accountNumber,[Validators.required]],
    accountName:[this.data.fournisseurs.accountName,[Validators.required]],
    iban:[this.data.fournisseurs.iban,[Validators.required]],
    adressebk:[this.data.fournisseurs.adressebk,[Validators.required]],
    emailbk:[this.data.fournisseurs.emailbk,[Validators.required,Validators.email]],
    paysbk:[this.data.fournisseurs.paysbk.id,[Validators.required]],
    villebk:[this.data.fournisseurs.villebk.id,[Validators.required]],
    tel:[this.data.fournisseurs.tel,[Validators.required]],
    typePayement:[this.data.fournisseurs.typePayement,[Validators.required]],

  });


  this.firstFormGroup.valueChanges.subscribe(data => this.onValueChangedfirst(data));
  this.onValueChangedfirst();
  this.secondFormGroup.valueChanges.subscribe(data => this.onValueChangedsecond(data));
  this.onValueChangedsecond();
  this.thiredFormGroup.valueChanges.subscribe(data => this.onValueChanged3(data));
  this.onValueChanged3();
}

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }
  getDevise()
  {
    this.devisesService.getDevises().subscribe(
      res=>{
        this.devises=res;
        this.firstFormGroup.get('devises').setValue(this.data.fournisseurs.devises.id);
      }
    );
  }
  getSecteurs()
  {
    
    this.sercteursService.getSecteurs().subscribe(
      res=>{
        this.secteurs=res;
      }
    );

  }

  getPays()
  {
    this.paysServices.getPays().subscribe(
      res=>{
        this.lesPays=res;
      }
    );
  }

 getVillesByPaysId(id?:number)
 {this.isVillesLoading=true;
    this.villesServices.getVillesByPaysId(id).subscribe(
      res=>{
        this.villesParPays=res;
        this.isVillesLoading=false;
      }
    );
 }
 getVillesByPaysIdbk(id?:number)
 {this.isVillesLoading=true;
    this.villesServices.getVillesByPaysId(id).subscribe(
      res=>{
        this.villesParPaysbk=res;
        this.isVillesLoading=false;
      }
    );
 }

 creatFormdata()
 {
  const fournisseursData: FormData = new FormData();
  fournisseursData.append("titre", this.firstFormGroup.get('titre').value);
  fournisseursData.append("nomSociete",this.firstFormGroup.get("nomSociete").value);
  fournisseursData.append("formeJuridique", this.firstFormGroup.get('formeJuridique').value);
  fournisseursData.append("secteurs", this.firstFormGroup.get("secteurs").value);
  //fournisseursData.append("contract",this.file,this.file.name);
  fournisseursData.append("devises",JSON.stringify (this.firstFormGroup.get("devises").value));
  fournisseursData.append("phoneNumber", this.secondFormGroup.get('phoneNumber').value);
  fournisseursData.append("email", this.secondFormGroup.get("email").value);
  fournisseursData.append("emailcommande", this.secondFormGroup.get('emailcommande').value);
  fournisseursData.append("telCommande", this.secondFormGroup.get("telCommande").value);
  fournisseursData.append("codePostale", this.secondFormGroup.get('codePostale').value);
  fournisseursData.append("adresse", this.secondFormGroup.get("adresse").value);
 
  fournisseursData.append("ville", JSON.stringify(this.secondFormGroup.get("ville").value));
  fournisseursData.append("pays", JSON.stringify(this.secondFormGroup.get('pays').value));
  fournisseursData.append("nomDg", this.firstFormGroup.get("nomDg").value);
  fournisseursData.append("telDg", this.firstFormGroup.get('telDg').value);
  fournisseursData.append("bankName", this.thiredFormGroup.get("bankName").value);
  fournisseursData.append("accountNumber", this.thiredFormGroup.get('accountNumber').value);
  fournisseursData.append("accountName", this.thiredFormGroup.get("accountName").value);
  fournisseursData.append("iban", this.thiredFormGroup.get('iban').value);
  fournisseursData.append("emailbk", this.thiredFormGroup.get("emailbk").value);
  fournisseursData.append("villebk", JSON.stringify(this.thiredFormGroup.get('villebk').value));
  fournisseursData.append("paysbk", JSON.stringify(this.thiredFormGroup.get("paysbk").value));
  fournisseursData.append("adressebk", this.thiredFormGroup.get("adressebk").value);
  fournisseursData.append("tel", this.thiredFormGroup.get("tel").value);
  fournisseursData.append("typePayement", this.thiredFormGroup.get('typePayement').value);
  return fournisseursData;
 }


 buildFormData()
 {
   let monFournisseurs=new EditFournisseurs();
   const contracData: FormData = new FormData();
   //contracData.append(`data`, this.file, this.file.name );
   monFournisseurs= {
   titre:this.firstFormGroup.get('titre').value ,
   nomSociete:this.firstFormGroup.get("nomSociete").value,
   formeJuridique:this.firstFormGroup.get('formeJuridique').value,
   secteurs:this.firstFormGroup.get("secteurs").value,
   contract:null,
   devises:this.firstFormGroup.get("devises").value,
   phoneNumber:this.secondFormGroup.get('phoneNumber').value,
   email:this.secondFormGroup.get("email").value,
   emailcommande:this.secondFormGroup.get('emailcommande').value,
   telCommande:this.secondFormGroup.get("telCommande").value,
   codePostale:this.secondFormGroup.get('codePostale').value,
   adresse:this.secondFormGroup.get("adresse").value,
   villesName:this.secondFormGroup.get('villesName').value,
   ville:this.secondFormGroup.get("ville").value,
   pays:this.secondFormGroup.get('pays').value,
   nomDg:this.firstFormGroup.get("nomDg").value,
   telDg:this.firstFormGroup.get('telDg').value,
   bankName:this.thiredFormGroup.get("bankName").value,
   accountNumber:this.thiredFormGroup.get('accountNumber').value,
   accountName:this.thiredFormGroup.get("accountName").value,
   iban:this.thiredFormGroup.get('iban').value,
   emailbk:this.thiredFormGroup.get("emailbk").value,
   villebk:this.thiredFormGroup.get('villebk').value,
   paysbk:this.thiredFormGroup.get("paysbk").value,
   adressebk:this.thiredFormGroup.get("adressebk").value,
   tel:this.thiredFormGroup.get("tel").value,
   typePayement:this.thiredFormGroup.get('typePayement').value
   };

   return monFournisseurs;
  }

  onNoClick(): void {
    this.dialogRef.close({result:0});;
  }

  editFournisseurs()
  {
    
  
    this.onValueChanged3();
if (!this.thiredFormGroup.invalid) {
  let monFournisseurs=this.creatFormdata();
  console.log(monFournisseurs);
  
  this.fourniseurService.updateFournisseurs(monFournisseurs,this.data.fournisseurs.id).subscribe(

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

  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.firstFormGroup.get('contract').setValue(this.file.name); 
      this.fileInformation = null;
    }
  }




  onValueChangedfirst(data?: any) {
    if (!this.firstFormGroup) {
      return;
    }
    const form = this.firstFormGroup;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control  && !control.valid) {
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
  
  onValueChangedsecond(data?: any) {
    if (!this.secondFormGroup) {
      return;
    }
    const form = this.secondFormGroup;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control  && !control.valid) {
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

  onValueChanged3(data?: any) {
    if (!this.thiredFormGroup) {
      return;
    }
    const form = this.thiredFormGroup;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control  && !control.valid) {
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
  compareIds(id1:any, id2:any):boolean{
    const a1=determineId(id1);
    const a2=determineId(id2);
    return a1===a2;
  }


}
export function determineId(id:any):string {
    if (id.constructor.name=='array' && id.length>0) {
      return ''+id[0];
    }
    return ''+ id;
}