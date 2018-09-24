import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Departements } from '../../models/departements';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DepartementsService } from '../../services/departements.service';
import { MessageboxService } from '../../services/messagebox.service';
import { AddDepartementsComponent } from './dialog/add/add-departements/add-departements.component';
import { EditDepartementsComponent } from './dialog/edit/edit-departements/edit-departements.component';

@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrls: ['./departements.component.scss']
})
export class DepartementsComponent implements OnInit, AfterViewInit {

  private Departements: Departements[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'name', 'description', 'headName', 'actions'];
  isLoading: boolean;

  constructor(private departementsService: DepartementsService, private messageboxService: MessageboxService, private dialog: MatDialog) {
    this.isLoading = true;
   }

  ngOnInit() {
    this.getDepartements();
    this.isLoading = true;
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getDepartements() {
    this.departementsService.getDepartements().subscribe(
      res =>  {
        this.dataSource.data = res;
        this.isLoading = false;
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

  deleteDepartements(departements?: Departements) {

  this.messageboxService.ShowMessage('Avertissement', 'Supprimer  ' + departements.name, '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

    this.result = res;
    console.log(res);
    if (this.result.result === 'yes') {
      this.departementsService.deleteDepartements(departements.id).subscribe(_res =>  {
        if (res != null) {
          this.messageboxService.ShowMessage('Information', departements.name + ' Supprimer avec succès', departements.name, 0, false, 1, '500px', 'info', 'primary');
          this.getDepartements();
        }



      }, err =>  {
                  if (err != null) {
                    console.log(err);
                    this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle ' + departements.name + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                  }

      }

      );

    }

  });


}

  addNewDepartements() {

    const dialogRef = this.dialog.open(AddDepartementsComponent, {
      data: {departements: ''},
     width: '750px',
     panelClass: 'atomics-dialog-container',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      console.log(res);
      if (res.result === 1) {
        this.getDepartements();
        this.messageboxService.ShowMessage('Information', 'Departements ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }
  EditDepartements(departements?: Departements) {

     console.log(departements);
    const dialogRef = this.dialog.open(EditDepartementsComponent, {
      data: {departements: departements},
     width: '750px',
     panelClass: 'atomics-dialog-container',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      if (res.result === 1) {
        this.getDepartements();
        this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', departements.name, 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }


}
