import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Devises } from '../../models/devises';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DevisesService } from '../../services/devises.service';
import { AddDevisesDialogComponent } from './dialogs/add/add-devises-dialog/add-devises-dialog.component';
import { EditDevisesDialogComponent } from './dialogs/edit/edit-devises-dialog/edit-devises-dialog.component';
import { MessageboxService } from '../../services/messagebox.service';

@Component({
  selector: 'app-devises',
  templateUrl: './devises.component.html',
  styleUrls: ['./devises.component.scss']
})
export class DevisesComponent implements OnInit , AfterViewInit {

  private Devises: Devises[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'label', 'symbole', 'codeIso', 'actions'];
  isLoading: boolean;
  constructor(private devisesService: DevisesService, private messageboxService: MessageboxService, private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.getDevises();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getDevises() {
    this.devisesService.getDevises().subscribe(
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

  deleteDevises(devises?: Devises) {

  this.messageboxService.ShowMessage('Avertissement', 'Supprimer  ' + devises.label, '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

    this.result = res;
    console.log(res);
    if (this.result.result === 'yes') {
      this.devisesService.deleteDevises(devises.id).subscribe(_res =>  {
        if (res != null) {
          this.messageboxService.ShowMessage('Information', devises.label + ' Supprimer avec succès', devises.label, 0, false, 1, '500px', 'info', 'primary');
          this.getDevises();
        }



      }, err =>  {
                  if (err != null) {
                    console.log(err);
                    this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle ' + devises.label + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                  }

      }

      );

    }

  });


}

  addNewDevises() {

    const dialogRef = this.dialog.open(AddDevisesDialogComponent, {
      data: {devises: ''},
     width: '600px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      console.log(res);
      if (res.result === 1) {
        this.getDevises();
        this.messageboxService.ShowMessage('Information', 'Devises ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }
  EditDevises(devises?: Devises) {

    const dialogRef = this.dialog.open(EditDevisesDialogComponent, {
      data: {devises: devises},
     width: '600px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      if (res.result === 1) {
        this.getDevises();
        this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', devises.label, 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }


}
