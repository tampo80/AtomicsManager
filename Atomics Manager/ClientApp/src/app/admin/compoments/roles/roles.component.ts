import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { AccountService } from '../../services/account.service';
import { MessageboxService } from '../../services/messagebox.service';
import { Role } from '../../models/role.model';
import { error } from 'protractor';
import { AddRolesDialogComponent } from './dialogs/add/add-roles-dialog/add-roles-dialog.component';
import { EditRolesDialogComponent } from './dialogs/edit/edit-roles-dialog/edit-roles-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, AfterViewInit {

  roles: Role[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'name', 'description', 'usersCount', 'actions'];

constructor(public accountService: AccountService, private messageboxService: MessageboxService, private dialog: MatDialog) {
}

  ngOnInit() {
   this.getRoles();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRoles() {
    this.accountService.getRoles().subscribe(roles => this.dataSource.data = roles);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  rowClicked(row: any): void {
    console.log(row);
  }

deleteRole(role?: Role) {

  this.messageboxService.ShowMessage('Avertissement', 'Supprimer l\'utilisateur ' + role.name, '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

    this.result = res;
    console.log(res);
    if (this.result.result === 'yes') {
      this.accountService.deleteRoles(role.id).subscribe(response =>  {
        if (response != null) {
          this.messageboxService.ShowMessage('Information', role.name + ' Supprimer avec succès', role.name, 0, false, 1, '500px', 'info', 'primary');
          this.getRoles();
        }



      }, err =>  {
                  if (err != null) {
                    console.log(err);
                    this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle ' + role.name + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                  }

      }

      );

    }

  });


}

  addNewRole(role?: Role) {

    const dialogRef = this.dialog.open(AddRolesDialogComponent, {
      data: {role: role},
     width: '900px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      console.log(res);
      if (res.result === 1) {
        this.getRoles();
        this.messageboxService.ShowMessage('Information', 'rôle ajouter avec succès', role.name, 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }
  EditRole(role?: Role) {

    const dialogRef = this.dialog.open(EditRolesDialogComponent, {
      data: {role: role},
     width: '900px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      if (res.result === 1) {
        this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', role.name, 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }



}
