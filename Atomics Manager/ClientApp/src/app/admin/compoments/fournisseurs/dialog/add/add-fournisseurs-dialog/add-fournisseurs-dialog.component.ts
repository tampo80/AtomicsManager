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

@Component({
  selector: 'app-add-fournisseurs-dialog',
  templateUrl: './add-fournisseurs-dialog.component.html',
  styleUrls: ['./add-fournisseurs-dialog.component.scss']
})


export class AddFournisseursDialogComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput: ElementRef;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  theidFormGroup: FormGroup;
  devises:Devises[];
  secteurs:Secteurs[];
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
  constructor(private devisesService:DevisesService,private sercteursService:SecteursService, private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<AddFournisseursDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.getDevise();
    this.getSecteurs();
    this.firstFormGroup = this._formBuilder.group({
      titre:[],
      nomSociete:[],
      formeJuridique:['',Validators.required],
      secteurs: ['', Validators.required],
      contract:[],
      devises:[]


    });
    this.secondFormGroup = this._formBuilder.group({
      
      phoneNumber:[],
      email:[],
      emailcommande:[],
      telCommande:[],
      codePostale:[],
      adresse:[],
      villesName:[]
    });
    this.theidFormGroup = this._formBuilder.group({
      bankName:[],
      accountNumber:[],
      AccountName:[],
      iban:[],
      adrresse:[],
      email:[],
      Email:[],

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
  onNoClick(): void {
    this.dialogRef.close({result:0});;
  }

  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.firstFormGroup.get('contract').setValue(this.file.name); (1)
      this.fileInformation = null;
    }
  }
  
}
