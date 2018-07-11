import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaysService } from '../../../../../services/pays.service';
import { VillesService } from '../../../../../services/villes.service';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { Villes } from '../../../../../models/villes';
import { Pays } from '../../../../../models/pays.model';

@Component({
  selector: 'app-edit-villes-dialog',
  templateUrl: './edit-villes-dialog.component.html',
  styleUrls: ['./edit-villes-dialog.component.scss']
})
export class EditVillesDialogComponent implements OnInit {

  
  villesForm:FormGroup;
  Pays:Pays[];
  constructor(private messageboxService:MessageboxService,public villeService:VillesService,private paysService:PaysService, private fb: FormBuilder,public dialogRef: MatDialogRef<EditVillesDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
   // data.villes=new Villes();
  }

  ngOnInit() {
    this.getPays();
    this.villesForm=this.fb.group(
      {
        id:[this.data.villes.id,Validators.required],
        name:[this.data.villes.name,Validators.required],
        paysId:[this.data.villes.paysId,Validators.required]

      }
    );
  }
 getPays()
 {
   this.paysService.getPays().subscribe(res=>{
    this.Pays=res;
   }
    
   );
 }
 onNoClick(): void {
  this.dialogRef.close({result:0});;
}

onSubmit() {
  //  alert("p");
  this.villeService.updateVilles(this.villesForm.value as Villes).subscribe(
  
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
