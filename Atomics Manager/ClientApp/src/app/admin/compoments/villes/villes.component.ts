import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Villes } from '../../models/villes';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { VillesService } from '../../services/villes.service';
import { MessageboxService } from '../../services/messagebox.service';
import { AddVillesDialogComponent } from './dialog/add/add-villes-dialog/add-villes-dialog.component';
import { EditVillesDialogComponent } from './dialog/edit/edit-villes-dialog/edit-villes-dialog.component';

@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
  styleUrls: ['./villes.component.scss']
})
export class VillesComponent implements OnInit,AfterViewInit {

  private Villes:Villes[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id','name','paysName','actions'];
  isLoading:boolean;

  constructor(private villesService:VillesService,private messageboxService:MessageboxService,private dialog: MatDialog) {
    this.isLoading=true;
   }

  ngOnInit() {
    this.getVilles();
    this.isLoading=true;
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getVilles() {
    this.villesService.getVilles().subscribe(
      res=>{
        this.dataSource.data=res;
        this.isLoading=false;
      }
    );
  }



  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  rowClicked(row: any): void {
    console.log(row);
  }

  deleteVilles(villes?:Villes){
  
  this.messageboxService.ShowMessage("Avertissement","Supprimer  "+villes.name,"",2,false,1,'520px',"warning",'warn').subscribe(res => {
      
    this.result = res
    console.log(res);
    if (this.result.result=="yes") {
      this.villesService.deleteVilles(villes.id).subscribe(res=>{
        if (res!=null) {
          this.messageboxService.ShowMessage("Information",villes.name+" Supprimer avec succès",villes.name,0,false,1,'500px',"info",'primary');
          this.getVilles();
        }
      
        
       
      },err=>{
                  if (err!=null) {
                    console.log(err);
                    this.messageboxService.ShowMessage("Information","Impossible de supprimer le rôle "+villes.name+" car il est assigné à des utilisateurs ",'',0,false,1,'500px',"info",'primary');
                  }

      }

      );
     
    }
  
  });


}

  addNewVilles(){

    const dialogRef = this.dialog.open(AddVillesDialogComponent,{
      data:{villes:""},
     width:'600px',
     disableClose:true
    });

    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      if (res.result===1) {
        this.getVilles();
        this.messageboxService.ShowMessage("Information","Villes ajouter avec succès","",0,false,1,'500px',"info",'primary');
      }
    }


    );
  }
  EditVilles(villes?:Villes){

    const dialogRef = this.dialog.open(EditVillesDialogComponent,{
      data:{villes:villes},
     width:'600px',
     disableClose:true
    });

    dialogRef.afterClosed().subscribe(res=>{
      if (res.result===1) {
        this.getVilles();
        this.messageboxService.ShowMessage("Information"," modification éffectuée avec succès",villes.name,0,false,1,'500px',"info",'primary');
      }
    }


    );
  }


}
