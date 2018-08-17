import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Transition } from '../models/transition';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { TransitionService } from '../services/transition.service';
import { MessageboxService } from '../../services/messagebox.service';
import { AddTransitionDialogComponent } from './dialog/add-transition-dialog/add-transition-dialog.component';
import { EditTransitionDialogComponent } from './dialog/edit-transition-dialog/edit-transition-dialog.component';
import { SetActionComponent } from './dialog/set-action/set-action.component';

@Component({
  selector: 'app-transitions',
  templateUrl: './transitions.component.html',
  styleUrls: ['./transitions.component.scss']
})
export class TransitionsComponent implements OnInit , AfterViewInit {

  private Transition: Transition[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();


  displayedColumns = ['id', 'processName', 'etatActuelName', 'etatSuivantName', 'actions'];

  constructor(private transitionService: TransitionService, private messageboxService: MessageboxService, private dialog: MatDialog) {

   }

  ngOnInit() {
    this.getTransition();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getTransition() {
    this.transitionService.getTransition().subscribe(
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

  deleteTransition(transition?: Transition) {

  this.messageboxService.ShowMessage('Avertissement', 'Supprimer la transition', '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

    this.result = res;
    console.log(res);
    if (this.result.result === 'yes') {
      this.transitionService.deleteTransition(transition.id).subscribe(Response => {
        if (Response != null) {
          this.messageboxService.ShowMessage('Information',  'La transition à été bien supprimer avec succès', '', 0, false, 1, '500px', 'info', 'primary');
          this.getTransition();
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

  addNewTransition() {

    const dialogRef = this.dialog.open(AddTransitionDialogComponent, {
      data: {transition: ''},
      panelClass: 'atomics-dialog-container',
     width: '750px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res.result === 1) {
        this.getTransition();
        this.messageboxService.ShowMessage('Information', 'Transition ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }
  EditTransition(transition?: Transition) {

    const dialogRef = this.dialog.open(EditTransitionDialogComponent, {
      panelClass: 'atomics-dialog-container',
      data: {transition: transition},
     width: '750px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.result === 1) {
        this.getTransition();
        this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }

  SetAction(transition?: Transition) {

    const dialogRef = this.dialog.open(SetActionComponent, {
      panelClass: 'atomics-dialog-container',
      data: {transition: transition},
      width: '750px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.result === 1) {
        this.getTransition();
        this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }

}
