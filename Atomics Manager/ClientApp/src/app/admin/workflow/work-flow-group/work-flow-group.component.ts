import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { TypeApprovalGroup } from '../../models/type-approval-group';
import { TYPE_APPROVAL_GROUP } from '../../config/enum-data';
import { GroupService } from '../services/group.service';
import { Group } from '../models/group';
import { MessageboxService } from '../../services/messagebox.service';
import { EditGroupDialogComponent } from './dialog/edit-group-dialog/edit-group-dialog.component';
import { AddGroupDialogComponent } from './dialog/add-group-dialog/add-group-dialog.component';
import { AddGroupMembersDialogComponent } from './dialog/add-group-members-dialog/add-group-members-dialog.component';

@Component({
  selector: 'app-work-flow-group',
  templateUrl: './work-flow-group.component.html',
  styleUrls: ['./work-flow-group.component.scss']
})
export class WorkFlowGroupComponent implements OnInit, AfterViewInit {




  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'name', 'description', 'processName',  'actions'];
  isLoading: boolean;
  typeApproval: TypeApprovalGroup[] = TYPE_APPROVAL_GROUP;
  // tslint:disable-next-line:max-line-length
  constructor(private groupService: GroupService, private messageboxService: MessageboxService, private dialog: MatDialog) {
    this.isLoading = true;
   }

  ngOnInit() {
    this.getGroup();
    this.isLoading = true;
  }

  getType(value: boolean) {
    let res = '';
    switch (value) {
      case true:
        res = 'Partagé';
        break;
      case false:
        res = 'Non Partagé';

    }
    return res;
  }
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getGroup() {
    this.groupService.getGroup().subscribe(
      res => {
        this.dataSource.data = res;
        this.isLoading = false;
      }
    );
  }


  getTypeApprobation(value: number) {
    return this.typeApproval.find(e => e.value === value).label;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  rowClicked(row: any): void {
    console.log(row);
  }

  deleteGroup(group?: Group) {

  // tslint:disable-next-line:max-line-length
  this.messageboxService.ShowMessage('Avertissement', 'Supprimer  ' + group.name, '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

    this.result = res;

    if (this.result.result === 'yes') {
      // tslint:disable-next-line:no-shadowed-variable
      this.groupService.deleteGroup(group.id).subscribe(res => {
        if (res != null) {
          // tslint:disable-next-line:max-line-length
          this.messageboxService.ShowMessage('Information', group.name + ' Supprimer avec succès', group.name, 0, false, 1, '500px', 'info', 'primary');
          this.getGroup();
        }



      }, err => {
                  if (err != null) {
                    console.log(err);
                    // tslint:disable-next-line:max-line-length
                    this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle ' + group.name + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                  }

      }

      );

    }

  });


}

  addNewGroup() {

    const dialogRef = this.dialog.open(AddGroupDialogComponent, {
    data: {group: ''},
    panelClass: 'atomics-dialog-container',
     width: '750px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res.result === 1) {
        this.getGroup();
        // tslint:disable-next-line:max-line-length
        this.messageboxService.ShowMessage('Information', 'Group ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }

  manageGroupMembers(group: Group) {

    const dialogRef = this.dialog.open(AddGroupMembersDialogComponent, {
     data: {group: group},
     panelClass: 'atomics-dialog-container',
     width: '800px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res.result === 1) {
        this.getGroup();
        // tslint:disable-next-line:max-line-length
        this.messageboxService.ShowMessage('Information', ' Opération appliquée  avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }
  EditGroup(group?: Group) {

     console.log(group);
    const dialogRef = this.dialog.open(EditGroupDialogComponent, {
      data: {group: group},
      panelClass: 'atomics-dialog-container',
     width: '750px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.result === 1) {
        this.getGroup();
        // tslint:disable-next-line:max-line-length
        this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', group.name, 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }


}
