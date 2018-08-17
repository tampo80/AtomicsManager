import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Actions } from '../models/actions';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ActionsService } from '../services/actions.service';
import { MessageboxService } from '../../services/messagebox.service';
import { ActionsType } from '../config/actions-type.enum';
import { AddActionsDialogComponent } from './dialog/add-actions-dialog/add-actions-dialog.component';
import { EditActionsDialogComponent } from './dialog/edit-actions-dialog/edit-actions-dialog.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit  , AfterViewInit {

    private Actions: Actions[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public result: any;
    dataSource = new MatTableDataSource();
    typeActions = ActionsType;
    displayedColumns = ['id', 'name', 'description', 'processName', 'typeAction', 'actions'];

    constructor(private actionsService: ActionsService, private messageboxService: MessageboxService, private dialog: MatDialog) {
      this.typeActions = ActionsType;
     }

    ngOnInit() {
      this.getActions();
    }

    ngAfterViewInit() {

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

     getActions() {
      this.actionsService.getActions().subscribe(
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

    deleteActions(actions?: Actions) {

    this.messageboxService.ShowMessage('Avertissement', 'Supprimer ' + actions.name, '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

      this.result = res;
      console.log(res);
      if (this.result.result === 'yes') {
        this.actionsService.deleteActions(actions.id).subscribe(Response => {
          if (Response != null) {
            this.messageboxService.ShowMessage('Information', actions.name + ' Supprimer avec succès', actions.name, 0, false, 1, '500px', 'info', 'primary');
            this.getActions();
          }



        }, err => {
                    if (err != null) {
                      console.log(err);
                      this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle ' + actions.name + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                    }

        }

        );

      }

    });


  }

    addNewActions() {

      const dialogRef = this.dialog.open(AddActionsDialogComponent, {
        data: {actions: ''},
        panelClass: 'atomics-dialog-container',
       width: '750px',
       disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
        if (res.result === 1) {
          this.getActions();
          this.messageboxService.ShowMessage('Information', 'Actions ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
        }
      }


      );
    }
    EditActions(actions?: Actions) {

      const dialogRef = this.dialog.open(EditActionsDialogComponent, {
        panelClass: 'atomics-dialog-container',
        data: {actions: actions},
       width: '750px',
       disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res.result === 1) {
          this.getActions();
          this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', actions.name, 0, false, 1, '500px', 'info', 'primary');
        }
      }


      );
    }


  }
