import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { ActiviteService } from '../services/activite.service';
import { MessageboxService } from '../../services/messagebox.service';
import { TypeActivite } from '../config/type-activite.enum';
import { Activite } from '../models/activite';
import { AddActiviteDialogComponent } from './dialog/add-activite-dialog/add-activite-dialog.component';
import { EditActiviteDialogComponent } from './dialog/edit-activite-dialog/edit-activite-dialog.component';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.scss']
})
export class ActiviteComponent implements OnInit, AfterViewInit {

    private Activite: Activite[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public result: any;
    dataSource = new MatTableDataSource();
    typeActivites = TypeActivite;

    displayedColumns = ['id', 'name', 'descriptions', 'processName', 'typeActivite', 'actions'];

    constructor(private activiteService: ActiviteService, private messageboxService: MessageboxService, private dialog: MatDialog) {
      this.typeActivites = TypeActivite;
     }

    ngOnInit() {
      this.getActivite();
    }

    ngAfterViewInit() {

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

     getActivite() {
      this.activiteService.getActivite().subscribe(
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

    deleteActivite(activite?: Activite) {

    this.messageboxService.ShowMessage('Avertissement', 'Supprimer ' + activite.name, '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

      this.result = res;
      console.log(res);
      if (this.result.result === 'yes') {
        this.activiteService.deleteActivite(activite.id).subscribe(Response => {
          if (Response != null) {
            this.messageboxService.ShowMessage('Information', activite.name + ' Supprimer avec succès', activite.name, 0, false, 1, '500px', 'info', 'primary');
            this.getActivite();
          }



        }, err => {
                    if (err != null) {
                      console.log(err);
                      this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle ' + activite.name + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                    }

        }

        );

      }

    });


  }

    addNewActivite() {

      const dialogRef = this.dialog.open(AddActiviteDialogComponent, {
        data: {activite: ''},
        panelClass: 'atomics-dialog-container',
       width: '750px',
       disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
        if (res.result === 1) {
          this.getActivite();
          this.messageboxService.ShowMessage('Information', 'Activite ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
        }
      }


      );
    }
    EditActivite(activite?: Activite) {

      const dialogRef = this.dialog.open(EditActiviteDialogComponent, {
        panelClass: 'atomics-dialog-container',
        data: {activite: activite},
       width: '750px',
       disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res.result === 1) {
          this.getActivite();
          this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', activite.name, 0, false, 1, '500px', 'info', 'primary');
        }
      }


      );
    }


  }
