import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PaysService } from '../../services/pays.service';
import { Pays } from '../../models/pays.model';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { MessageboxService } from '../../services/messagebox.service';
import { EditPaysDialogComponent } from './dialogs/edit/edit-pays-dialog/edit-pays-dialog.component';
import { AddPaysDialogComponent } from './dialogs/add/add-pays-dialog/add-pays-dialog.component';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.scss']
})
export class PaysComponent implements OnInit,AfterViewInit {

  private Pays:Pays[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id','name','codePays','actions'];

  constructor(private paysService:PaysService,private messageboxService:MessageboxService,private dialog: MatDialog) { }

  ngOnInit() {
    this.getPays();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getPays() {
    this.paysService.getPays().subscribe(
      res=>{
        this.dataSource.data=res;
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

  deletePays(pays?:Pays){
  
  this.messageboxService.ShowMessage("Avertissement","Supprimer "+pays.name,"",2,false,1,'520px',"warning",'warn').subscribe(res => {
      
    this.result = res
    console.log(res);
    if (this.result.result=="yes") {
      this.paysService.deletePays(pays.id).subscribe(res=>{
        if (res!=null) {
          this.messageboxService.ShowMessage("Information",pays.name+" Supprimer avec succès",pays.name,0,false,1,'500px',"info",'primary');
          this.getPays();
        }
      
        
       
      },err=>{
                  if (err!=null) {
                    console.log(err);
                    this.messageboxService.ShowMessage("Information","Impossible de supprimer le rôle "+pays.name+" car il est assigné à des utilisateurs ",'',0,false,1,'500px',"info",'primary');
                  }

      }

      );
     
    }
  
  });


}

  addNewPays(){

    const dialogRef = this.dialog.open(AddPaysDialogComponent,{
      data:{pays:""},
     width:'600px',
     disableClose:true
    });

    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      if (res.result===1) {
        this.getPays();
        this.messageboxService.ShowMessage("Information","Pays ajouter avec succès","",0,false,1,'500px',"info",'primary');
      }
    }


    );
  }
  EditPays(pays?:Pays){

    const dialogRef = this.dialog.open(EditPaysDialogComponent,{
      data:{pays:pays},
     width:'600px',
     disableClose:true
    });

    dialogRef.afterClosed().subscribe(res=>{
      if (res.result===1) {
        this.messageboxService.ShowMessage("Information"," modification éffectuée avec succès",pays.name,0,false,1,'500px',"info",'primary');
      }
    }


    );
  }


}
