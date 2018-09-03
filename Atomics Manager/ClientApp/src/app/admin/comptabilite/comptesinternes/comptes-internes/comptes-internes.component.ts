import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ComptesInternes } from '../../models/comptes-internes';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { ComptesInternesService } from '../../services/comptes-internes.service';
import { MessageboxService } from '../../../services/messagebox.service';
import { AddComptesInternesDialogComponent } from './dialog/add-comptes-internes-dialog/add-comptes-internes-dialog.component';
import { EditComptesInternesDialogComponent } from './dialog/edit-comptes-internes-dialog/edit-comptes-internes-dialog.component';

@Component({
  selector: 'app-comptes-internes',
  templateUrl: './comptes-internes.component.html',
  styleUrls: ['./comptes-internes.component.scss']
})
export class ComptesInternesComponent implements OnInit

  , AfterViewInit {

    private ComptesInternes: ComptesInternes[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public result: any;
    dataSource = new MatTableDataSource();


    displayedColumns = ['id', 'processName', 'etatActuelName', 'etatSuivantName', 'actions'];

    constructor(private comptesInternesService: ComptesInternesService, private messageboxService: MessageboxService, private dialog: MatDialog) {

     }

    ngOnInit() {
      this.getComptesInternes();
    }

    ngAfterViewInit() {

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

     getComptesInternes() {
      this.comptesInternesService.getComptesInternes().subscribe(
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

    deleteComptesInternes(comptesInternes?: ComptesInternes) {

    this.messageboxService.ShowMessage('Avertissement', 'Supprimer la comptesInternes', '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

      this.result = res;
      console.log(res);
      if (this.result.result === 'yes') {
        this.comptesInternesService.deleteComptesInternes(comptesInternes.id).subscribe(Response => {
          if (Response != null) {
            this.messageboxService.ShowMessage('Information',  'La comptesInternes à été bien supprimer avec succès', '', 0, false, 1, '500px', 'info', 'primary');
            this.getComptesInternes();
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

    addNewComptesInternes() {

      const dialogRef = this.dialog.open(AddComptesInternesDialogComponent, {
        data: {comptesInternes: ''},
        panelClass: 'atomics-dialog-container',
       width: '750px',
       disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
        if (res.result === 1) {
          this.getComptesInternes();
          this.messageboxService.ShowMessage('Information', 'ComptesInternes ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
        }
      }


      );
    }
    EditComptesInternes(comptesInternes?: ComptesInternes) {

      const dialogRef = this.dialog.open(EditComptesInternesDialogComponent, {
        panelClass: 'atomics-dialog-container',
        data: {comptesInternes: comptesInternes},
       width: '750px',
       disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res.result === 1) {
          this.getComptesInternes();
          this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
        }
      }


      );
    }




  }
