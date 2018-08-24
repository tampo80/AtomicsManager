import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Etat } from '../models/etat';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { EtatService } from '../services/etat.service';
import { MessageboxService } from '../../services/messagebox.service';
import { AddEtatDialogComponent } from './add-etat-dialog/add-etat-dialog.component';
import { EditEtatDialogComponent } from './edit-etat-dialog/edit-etat-dialog.component';
import { TypeEtat } from '../config/type-etat.enum';
import { SetActivitesComponent } from './set-activites/set-activites.component';


@Component({
  selector: 'app-etats',
  templateUrl: './etats.component.html',
  styleUrls: ['./etats.component.scss']
})
export class EtatsComponent implements OnInit , AfterViewInit {

  private Etat: Etat[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  typeEtats = TypeEtat;

  displayedColumns = ['id', 'name', 'description', 'processName', 'typeEtats', 'actions'];

  constructor(private etatService: EtatService, private messageboxService: MessageboxService, private dialog: MatDialog) {
    this.typeEtats = TypeEtat;
   }

  ngOnInit() {
    this.getEtat();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getEtat() {
    this.etatService.getEtat().subscribe(
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

  deleteEtat(etat?: Etat) {

  this.messageboxService.ShowMessage('Avertissement', 'Supprimer ' + etat.name, '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

    this.result = res;
    console.log(res);
    if (this.result.result === 'yes') {
      this.etatService.deleteEtat(etat.id).subscribe(Response => {
        if (Response != null) {
          this.messageboxService.ShowMessage('Information', etat.name + ' Supprimer avec succès', etat.name, 0, false, 1, '500px', 'info', 'primary');
          this.getEtat();
        }



      }, err => {
                  if (err != null) {
                    console.log(err);
                    this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle ' + etat.name + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                  }

      }

      );

    }

  });


}

  addNewEtat() {

    const dialogRef = this.dialog.open(AddEtatDialogComponent, {
      data: {etat: ''},
      panelClass: 'atomics-dialog-container',
     width: '750px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res.result === 1) {
        this.getEtat();
        this.messageboxService.ShowMessage('Information', 'Etat ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }
  EditEtat(etat?: Etat) {

    const dialogRef = this.dialog.open(EditEtatDialogComponent, {
      panelClass: 'atomics-dialog-container',
      data: {etat: etat},
     width: '750px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.result === 1) {
        this.getEtat();
        this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', etat.name, 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }


  SetActivite(etat?: Etat) {

    const dialogRef = this.dialog.open(SetActivitesComponent, {
      panelClass: 'atomics-dialog-container',
      data: {etat: etat},
      width: '750px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.result === 1) {
        this.getEtat();
        this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }

}
