import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { AgencesService } from '../../services/agences.service';
import { MessageboxService } from '../../services/messagebox.service';
import { Agences } from '../../models/agences';
import { AddAgencesDialogComponent } from './dialog/add/add-agences-dialog/add-agences-dialog.component';
import { EditAgencesDialogComponent } from './dialog/edit/edit-agences-dialog/edit-agences-dialog.component';

@Component({
  selector: 'app-agences',
  templateUrl: './agences.component.html',
  styleUrls: ['./agences.component.scss']
})
export class AgencesComponent implements OnInit , AfterViewInit {

  private Agences: Agences[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'name', 'villesName', 'tel', 'headName', 'actions'];
  isLoading: boolean;

  constructor(private agencesService: AgencesService, private messageboxService: MessageboxService, private dialog: MatDialog) {
    this.isLoading = true;
   }

  ngOnInit() {
    this.getAgences();
    this.isLoading = true;
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getAgences() {
    this.agencesService.getAgences().subscribe(
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

  deleteAgences(agences?: Agences) {

  this.messageboxService.ShowMessage('Avertissement', 'Supprimer  ' + agences.name, '', 2, false, 1, '520px', 'warning', 'warn')
    .subscribe(res => {

    this.result = res;
    console.log(res);
    if (this.result.result === 'yes') {
      this.agencesService.deleteAgences(agences.id)
        .subscribe(_res =>  {
        if (res != null) {
          this.messageboxService.ShowMessage('Information', agences.name + ' Supprimer avec succès', agences.name, 0, false, 1, '500px', 'info', 'primary');
          this.getAgences();
        }



      }, err =>  {
                  if (err != null) {
                    console.log(err);
                    this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle ' + agences.name + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                  }

      }

      );

    }

  });


}

  addNewAgences() {

    const dialogRef = this.dialog.open(AddAgencesDialogComponent, {
      data: {agences: ''},
     width: '600px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      console.log(res);
      if (res.result === 1) {
        this.getAgences();
        this.messageboxService.ShowMessage('Information', 'Agences ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }
  EditAgences(agences?: Agences) {

     console.log(agences);
    const dialogRef = this.dialog.open(EditAgencesDialogComponent, {
      data: {agences: agences},
     width: '600px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      if (res.result === 1) {
        this.getAgences();
        this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', agences.name, 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }


}
