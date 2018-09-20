import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { FacturesService } from '../../../services/factures.service';
import { MessageboxService } from '../../../services/messagebox.service';
import { Factures } from '../../../models/factures';

@Component({
  selector: 'app-facturation',
  templateUrl: './facturation.component.html',
  styleUrls: ['./facturation.component.scss']
})
export class FacturationComponent implements OnInit, AfterViewInit {
  private Factures: Factures[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();



  displayedColumns = ['id',  'numCompte' , 'label', 'description', 'typeComptesName', 'actions'];

  constructor(private facturesService: FacturesService, private messageboxService: MessageboxService, private dialog: MatDialog) {

   }

  ngOnInit() {
    this.getFactures();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getFactures() {
    this.facturesService.getFacturesIn().subscribe(
      res => {
        this.dataSource.data = res;
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

  deleteFactures(factures?: Factures) {

  this.messageboxService.ShowMessage('Avertissement', 'Supprimer la factures', '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

    this.result = res;
    console.log(res);
    if (this.result.result === 'yes') {
      this.facturesService.deleteFactures(factures.id).subscribe(Response => {
        if (Response != null) {
          this.messageboxService.ShowMessage('Information',  'La factures à été bien supprimer avec succès', '', 0, false, 1, '500px', 'info', 'primary');
          this.getFactures();
        }



      }, err => {
                  if (err != null) {
                    console.log(err);
                    this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle '  + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                  }

      }

      );

    }

  });


}

 /*  addNewFactures() {

    const dialogRef = this.dialog.open(AddFacturesDialogComponent, {
      data: {factures: ''},
      panelClass: 'atomics-dialog-container',
     width: '750px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res.result === 1) {
        this.getFactures();
        this.messageboxService.ShowMessage('Information', 'Factures ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }
  EditFactures(factures?: Factures) {

    const dialogRef = this.dialog.open(EditFacturesDialogComponent, {
      panelClass: 'atomics-dialog-container',
      data: {factures: factures},
     width: '750px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.result === 1) {
        this.getFactures();
        this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  } */




}
