import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Fournisseurs } from '../../models/fournisseurs';
import { EditFournisseursDialogComponent } from './dialog/edit/edit-fournisseurs-dialog/edit-fournisseurs-dialog.component';
import { AddFournisseursDialogComponent } from './dialog/add/add-fournisseurs-dialog/add-fournisseurs-dialog.component';
import { MessageboxService } from '../../services/messagebox.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FournisseursService } from '../../services/fournisseurs.service';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss']
})
export class FournisseursComponent implements OnInit ,AfterViewInit {

  private Fournisseurs:Fournisseurs[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id','name','description','actions'];
  isLoading:boolean;
  constructor(private fournisseursService:FournisseursService,private messageboxService:MessageboxService,private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading=true;
    this.getFournisseurs();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getFournisseurs() {
    this.fournisseursService.getFournisseurs().subscribe(
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

  deleteFournisseurs(fournisseurs?:Fournisseurs){
  
  this.messageboxService.ShowMessage("Avertissement","Supprimer "+fournisseurs.name,"",2,false,1,'520px',"warning",'warn').subscribe(res => {
      
    this.result = res
    console.log(res);
    if (this.result.result=="yes") {
      this.fournisseursService.deleteFournisseurs(fournisseurs.id).subscribe(res=>{
        if (res!=null) {
          this.messageboxService.ShowMessage("Information",fournisseurs.name+" Supprimer avec succès",fournisseurs.name,0,false,1,'500px',"info",'primary');
          this.getFournisseurs();
        }
      
        
       
      },err=>{
                  if (err!=null) {
                    console.log(err);
                    this.messageboxService.ShowMessage("Information","Impossible de supprimer le rôle "+fournisseurs.name+" car il est assigné à des utilisateurs ",'',0,false,1,'500px',"info",'primary');
                  }

      }

      );
     
    }
  
  });


}

  addNewFournisseurs(){

    const dialogRef = this.dialog.open(AddFournisseursDialogComponent,{
      data:{fournisseurs:""},
     width:'600px',
     disableClose:true
    });

    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      if (res.result===1) {
        this.getFournisseurs();
        this.messageboxService.ShowMessage("Information","Fournisseurs ajouter avec succès","",0,false,1,'500px',"info",'primary');
      }
    }


    );
  }
  EditFournisseurs(fournisseurs?:Fournisseurs){

    const dialogRef = this.dialog.open(EditFournisseursDialogComponent,{
      data:{fournisseurs:fournisseurs},
     width:'600px',
     disableClose:true
    });

    dialogRef.afterClosed().subscribe(res=>{
      if (res.result===1) {
        this.getFournisseurs();
        this.messageboxService.ShowMessage("Information"," modification éffectuée avec succès",fournisseurs.name,0,false,1,'500px',"info",'primary');
      }
    }


    );
  }


}
