import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { MessageboxService } from '../../services/messagebox.service';
import { SecteursService } from '../../services/secteurs.service';
import { Secteurs } from '../../models/secteurs';
import { AddSecteursDialogComponent } from './dialog/add/add-secteurs-dialog/add-secteurs-dialog.component';
import { EditSecteursDialogComponent } from './dialog/edit/edit-secteurs-dialog/edit-secteurs-dialog.component';

@Component({
  selector: 'app-secteurs',
  templateUrl: './secteurs.component.html',
  styleUrls: ['./secteurs.component.scss']
})
export class SecteursComponent implements OnInit ,AfterViewInit {

  private Secteurs:Secteurs[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id','name','description','actions'];
  isLoading:boolean;
  constructor(private secteursService:SecteursService,private messageboxService:MessageboxService,private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading=true;
    this.getSecteurs();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getSecteurs() {
    this.secteursService.getSecteurs().subscribe(
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

  deleteSecteurs(secteurs?:Secteurs){
  
  this.messageboxService.ShowMessage("Avertissement","Supprimer "+secteurs.name,"",2,false,1,'520px',"warning",'warn').subscribe(res => {
      
    this.result = res
    console.log(res);
    if (this.result.result=="yes") {
      this.secteursService.deleteSecteurs(secteurs.id).subscribe(res=>{
        if (res!=null) {
          this.messageboxService.ShowMessage("Information",secteurs.name+" Supprimer avec succès",secteurs.name,0,false,1,'500px',"info",'primary');
          this.getSecteurs();
        }
      
        
       
      },err=>{
                  if (err!=null) {
                    console.log(err);
                    this.messageboxService.ShowMessage("Information","Impossible de supprimer le rôle "+secteurs.name+" car il est assigné à des utilisateurs ",'',0,false,1,'500px',"info",'primary');
                  }

      }

      );
     
    }
  
  });


}

  addNewSecteurs(){

    const dialogRef = this.dialog.open(AddSecteursDialogComponent,{
      data:{secteurs:""},
     width:'600px',
     disableClose:true
    });

    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      if (res.result===1) {
        this.getSecteurs();
        this.messageboxService.ShowMessage("Information","Secteurs ajouter avec succès","",0,false,1,'500px',"info",'primary');
      }
    }


    );
  }
  EditSecteurs(secteurs?:Secteurs){

    const dialogRef = this.dialog.open(EditSecteursDialogComponent,{
      data:{secteurs:secteurs},
     width:'600px',
     disableClose:true
    });

    dialogRef.afterClosed().subscribe(res=>{
      if (res.result===1) {
        this.getSecteurs();
        this.messageboxService.ShowMessage("Information"," modification éffectuée avec succès",secteurs.name,0,false,1,'500px',"info",'primary');
      }
    }


    );
  }


}
