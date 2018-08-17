import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { MessageboxService } from '../../services/messagebox.service';
import { Process } from '../models/process';
import { ProcessService } from '../services/process.service';
import { AddProcessDialogComponent } from './dialog/add-process-dialog/add-process-dialog.component';
import { EditProcessDialogComponent } from './dialog/edit-process-dialog/edit-process-dialog.component';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit, AfterViewInit {

    private Process: Process[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public result: any;
    dataSource = new MatTableDataSource();
    displayedColumns = ['id', 'name', 'description', 'actions'];

    constructor(private processService: ProcessService, private messageboxService: MessageboxService, private dialog: MatDialog) { }

    ngOnInit() {
      this.getProcess();
    }

    ngAfterViewInit() {

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

     getProcess() {
      this.processService.getProcess().subscribe(
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

    deleteProcess(process?: Process) {

    this.messageboxService.ShowMessage('Avertissement', 'Supprimer ' + process.name, '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

      this.result = res;
      console.log(res);
      if (this.result.result === 'yes') {
        this.processService.deleteProcess(process.id).subscribe(Response => {
          if (Response != null) {
            this.messageboxService.ShowMessage('Information', process.name + ' Supprimer avec succès', process.name, 0, false, 1, '500px', 'info', 'primary');
            this.getProcess();
          }



        }, err => {
                    if (err != null) {
                      console.log(err);
                      this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle ' + process.name + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                    }

        }

        );

      }

    });


  }

    addNewProcess() {

      const dialogRef = this.dialog.open(AddProcessDialogComponent, {
        data: {process: ''},
        panelClass: 'atomics-dialog-container',
       width: '750px',
       disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
        if (res.result === 1) {
          this.getProcess();
          this.messageboxService.ShowMessage('Information', 'Process ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
        }
      }


      );
    }
    EditProcess(process?: Process) {

      const dialogRef = this.dialog.open(EditProcessDialogComponent, {
        panelClass: 'atomics-dialog-container',
        data: {process: process},
       width: '750px',
       disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res.result === 1) {
          this.getProcess();
          this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', process.name, 0, false, 1, '500px', 'info', 'primary');
        }
      }


      );
    }


  }
