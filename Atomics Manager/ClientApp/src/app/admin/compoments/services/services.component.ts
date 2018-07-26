import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '../../../../../node_modules/@angular/material';
import { MessageboxService } from '../../services/messagebox.service';
import { AddServicesDialogComponent } from './dialog/add/add-services-dialog/add-services-dialog.component';
import { EditServicesDialogComponent } from './dialog/edit/edit-services-dialog/edit-services-dialog.component';
import { Services } from '../../models/services';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit , AfterViewInit {

  private Services:Services[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id','name','departementsName','description','headName','actions'];
  isLoading:boolean;

  constructor(private servicesService:ServicesService,private messageboxService:MessageboxService,private dialog: MatDialog) {
    this.isLoading=true;
   }

  ngOnInit() {
    this.getServices();
    this.isLoading=true;
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getServices() {
    this.servicesService.getServices().subscribe(
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

  deleteServices(services?:Services){

  this.messageboxService.ShowMessage("Avertissement","Supprimer  "+services.name,"",2,false,1,'520px',"warning",'warn').subscribe(res => {

    this.result = res
    console.log(res);
    if (this.result.result=="yes") {
      this.servicesService.deleteServices(services.id).subscribe(res=>{
        if (res!=null) {
          this.messageboxService.ShowMessage("Information",services.name+" Supprimer avec succès",services.name,0,false,1,'500px',"info",'primary');
          this.getServices();
        }



      },err=>{
                  if (err!=null) {
                    console.log(err);
                    this.messageboxService.ShowMessage("Information","Impossible de supprimer le rôle "+services.name+" car il est assigné à des utilisateurs ",'',0,false,1,'500px',"info",'primary');
                  }

      }

      );

    }

  });


}

  addNewServices(){

    const dialogRef = this.dialog.open(AddServicesDialogComponent,{
      data:{services:""},
     width:'600px',
     disableClose:true
    });

    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      if (res.result===1) {
        this.getServices();
        this.messageboxService.ShowMessage("Information","Services ajouter avec succès","",0,false,1,'500px',"info",'primary');
      }
    }


    );
  }
  EditServices(services?:Services){

     console.log(services);
    const dialogRef = this.dialog.open(EditServicesDialogComponent,{
      data:{services:services},
     width:'600px',
     disableClose:true
    });

    dialogRef.afterClosed().subscribe(res=>{
      if (res.result===1) {
        this.getServices();
        this.messageboxService.ShowMessage("Information"," modification éffectuée avec succès",services.name,0,false,1,'500px',"info",'primary');
      }
    }


    );
  }


}
