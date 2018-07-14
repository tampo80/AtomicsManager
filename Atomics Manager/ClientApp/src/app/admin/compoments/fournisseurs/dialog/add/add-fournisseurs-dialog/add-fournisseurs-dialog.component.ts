import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TypePayements } from '../../../../../models/type-payements';
import { FormeJuridique } from '../../../../../models/forme-juridique';
import { DevisesService } from '../../../../../services/devises.service';
import { Devises } from '../../../../../models/devises';
import { SecteursService } from '../../../../../services/secteurs.service';
import { Secteurs } from '../../../../../models/secteurs';
import { FileInformation } from '../../../../../models/file-information';
import { Pays } from '../../../../../models/pays.model';
import { Villes } from '../../../../../models/villes';
import { PaysService } from '../../../../../services/pays.service';
import { VillesService } from '../../../../../services/villes.service';
import { EditFournisseurs } from '../../../../../models/edit-fournisseurs';
import { Fournisseurs } from '../../../../../models/fournisseurs.model';
import { FournisseursService } from '../../../../../services/fournisseurs.service';

@Component({
  selector: 'app-add-fournisseurs-dialog',
  templateUrl: './add-fournisseurs-dialog.component.html',
  styleUrls: ['./add-fournisseurs-dialog.component.scss']
})


export class AddFournisseursDialogComponent implements OnInit {

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
      value:0,label:"Etablissement"
    },
    {
      value:1,label:"SARL SA"
    },
    {
      value:2,label:"SARL U"
    }
    
    
    
  ];
  constructor(private fourniseurService:FournisseursService, private devisesService:DevisesService,private sercteursService:SecteursService,private paysServices:PaysService,private villesServices:VillesService, private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<AddFournisseursDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    
    this.getDevise();
    this.getSecteurs();
    this.getPays();
    this.firstFormGroup = this._formBuilder.group({
      titre:['',Validators.required],
      nomSociete:['',Validators.required],
      formeJuridique:['',Validators.required],
      secteurs: ['', Validators.required],
      contract:['',Validators.required],
      devises:['',Validators.required],
      nomDg:['',[Validators.required]],
      telDg:['',[Validators.required]]

    });
    this.secondFormGroup = this._formBuilder.group({
      
      phoneNumber:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      emailcommande:['',[Validators.required,Validators.email]],
      telCommande:['',[Validators.required]],
      codePostale:['',[Validators.required]],
      adresse:['',[Validators.required]],
      villesName:['',[Validators.required]],
      pays:['',[Validators.required]],
      ville:['',[Validators.required]],
     
    });
    this.thiredFormGroup = this._formBuilder.group({
      bankName:['',[Validators.required]],
      accountNumber:['',[Validators.required]],
      accountName:['',[Validators.required]],
      iban:['',[Validators.required]],
      adressebk:['',[Validators.required]],
      emailbk:['',[Validators.required,Validators.email]],
      paysbk:['',[Validators.required]],
      villebk:['',[Validators.required]],
      tel:['',[Validators.required]],
      typePayement:['',[Validators.required]],

    });
  }
  selectFile(): void {
    this.fileInput.nativeElement.click();
  }
  getDevise()
  {
    this.devisesService.getDevises().subscribe(
      res=>{
        this.devises=res;
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

 creatFormdata()
 {
  const fournisseursData: FormData = new FormData();
  fournisseursData.append("titre", this.firstFormGroup.get('titre').value);
  fournisseursData.append("nomSociete",this.firstFormGroup.get("nomSociete").value);
  fournisseursData.append("formeJuridique", this.firstFormGroup.get('formeJuridique').value);
  fournisseursData.append("secteurs", this.firstFormGroup.get("secteurs").value);
  fournisseursData.append("contract",this.file,this.file.name);
  fournisseursData.append("devises", this.firstFormGroup.get("devises").value);
  fournisseursData.append("phoneNumber", this.secondFormGroup.get('phoneNumber').value);
  fournisseursData.append("email", this.secondFormGroup.get("email").value);
  fournisseursData.append("emailcommande", this.secondFormGroup.get('emailcommande').value);
  fournisseursData.append("telCommande", this.secondFormGroup.get("telCommande").value);
  fournisseursData.append("codePostale", this.secondFormGroup.get('codePostale').value);
  fournisseursData.append("adresse", this.secondFormGroup.get("adresse").value);
  fournisseursData.append("villesName", this.secondFormGroup.get('villesName').value);
  fournisseursData.append("ville", this.secondFormGroup.get("ville").value);
  fournisseursData.append("pays", this.secondFormGroup.get('pays').value);
  fournisseursData.append("nomDg", this.firstFormGroup.get("nomDg").value);
  fournisseursData.append("telDg", this.firstFormGroup.get('telDg').value);
  fournisseursData.append("bankName", this.thiredFormGroup.get("bankName").value);
  fournisseursData.append("accountNumber", this.thiredFormGroup.get('accountNumber').value);
  fournisseursData.append("accountName", this.thiredFormGroup.get("accountName").value);
  fournisseursData.append("iban", this.thiredFormGroup.get('iban').value);
  fournisseursData.append("emailbk", this.thiredFormGroup.get("emailbk").value);
  fournisseursData.append("villebk", this.thiredFormGroup.get('villebk').value);
  fournisseursData.append("paysbk", this.thiredFormGroup.get("paysbk").value);
  fournisseursData.append("adressebk", this.thiredFormGroup.get("adressebk").value);
  fournisseursData.append("tel", this.thiredFormGroup.get("tel").value);
  fournisseursData.append("typePayement", this.thiredFormGroup.get('typePayement').value);
  return fournisseursData;
 }


 buildFormData()
 {
   let monFournisseurs=new EditFournisseurs();
   const contracData: FormData = new FormData();
   contracData.append(`data`, this.file, this.file.name );
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

  addFournisseurs()
  {
    
    let monFournisseurs=this.creatFormdata();
    console.log(monFournisseurs);
    
    this.fourniseurService.addFournisseurs(monFournisseurs).subscribe();
  }

  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.firstFormGroup.get('contract').setValue(this.file.name); 
      this.fileInformation = null;
    }
  }
  
}
