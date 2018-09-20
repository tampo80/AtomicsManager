import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TypeComptes } from '../../models/type-comptes';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { TypeComptesService } from '../../services/type-comptes.service';
import { MessageboxService } from '../../../services/messagebox.service';
import { AddTypeComptesDialogComponent } from './dialog/add-type-comptes-dialog/add-type-comptes-dialog.component';
import { EditTypeComptesDialogComponent } from './dialog/edit-type-comptes-dialog/edit-type-comptes-dialog.component';
import { enumSelector } from '../../../shared/utilities/utilities';
import { NatureCompte } from '../../config/nature-compte.enum';

@Component({
  selector: 'app-type-comptes',
  templateUrl: './type-comptes.component.html',
  styleUrls: ['./type-comptes.component.scss']
})
export class TypeComptesComponent implements OnInit , AfterViewInit {

    private TypeComptes: TypeComptes[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public result: any;
    dataSource = new MatTableDataSource();


    displayedColumns = ['id', 'name', 'description', 'natureCompte', 'actions'];
    public natureComptes = NatureCompte;
    constructor(private typeComptesService: TypeComptesService, private messageboxService: MessageboxService, private dialog: MatDialog) {
      this.natureComptes = NatureCompte;
     }

    ngOnInit() {
      this.getTypeComptes();
    }

    ngAfterViewInit() {

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

     getTypeComptes() {
      this.typeComptesService.getTypeComptes().subscribe(
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

    deleteTypeComptes(typeComptes ?: TypeComptes) {

    this.messageboxService.ShowMessage('Avertissement', 'Supprimer le type de comptes', '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

      this.result = res;
      console.log(res);
      if (this.result.result === 'yes') {
        this.typeComptesService.deleteTypeComptes(typeComptes.id).subscribe(Response => {
          if (Response != null) {
            this.messageboxService.ShowMessage('Information',  'Le type de comptes à été bien supprimer avec succès', '', 0, false, 1, '500px', 'info', 'primary');
            this.getTypeComptes();
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

    addNewTypeComptes() {

      const dialogRef = this.dialog.open(AddTypeComptesDialogComponent, {
        data: {typeComptes: ''},
        panelClass: 'atomics-dialog-container',
       width: '750px',
       disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
        if (res.result === 1) {
          this.getTypeComptes();
          this.messageboxService.ShowMessage('Information', 'TypeComptes ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
        }
      }


      );
    }
    EditTypeComptes(typeComptes ?: TypeComptes) {

      const dialogRef = this.dialog.open(EditTypeComptesDialogComponent, {
        panelClass: 'atomics-dialog-container',
        data: {typeComptes: typeComptes},
       width: '750px',
       disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res.result === 1) {
          this.getTypeComptes();
          this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
        }
      }


      );
    }




  }
