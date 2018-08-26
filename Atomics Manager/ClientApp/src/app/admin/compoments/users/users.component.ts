import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { MessageboxService } from '../../services/messagebox.service';
import { AddDialogComponent } from './dialogs/add/add-dialog/add-dialog.component';
import { UserEdit } from '../../models/user-edit.model';
import { EditDialogComponent } from './dialogs/edit/edit-dialog/edit-dialog.component';
import { GlobalErrorInterceptor } from '../../interceptors/global-error.interceptor';
import { AlertService } from '../../services/alert.service';
import { SetUserPositionComponent } from './dialogs/set-user-position/set-user-position.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
    users: User[];
    Error: GlobalErrorInterceptor;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public result: any;
    dataSource = new MatTableDataSource();
    displayedColumns = ['id', 'jobTitle', 'userName', 'email', 'phoneNumber', 'fullName', 'roles', 'actions'];

  constructor(public accountService: AccountService, private alertService: AlertService, private messageboxService: MessageboxService, private dialog: MatDialog) {

    this.Error = new GlobalErrorInterceptor(alertService);
  }



  ngOnInit() {


    this.getUsers();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getUsers() {
    this.accountService.getUsers().subscribe(users => this.dataSource.data = users);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



  deleteUser(user: User) {

    this.messageboxService.ShowMessage('Avertissement', 'Supprimer l\'utilisateur ' + user.userName, '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

      this.result = res;
      console.log(res);
      if (this.result.result === 'yes') {
        this.accountService.deleteUser(user.id).subscribe(_res =>  {
          this.messageboxService.ShowMessage('Information', user.userName + ' Supprimer avec succès', user.friendlyName, 0, false, 1, '500px', 'info', 'accent');
          this.getUsers();
        }
        );

      }

    });
  }

  setUserposition(user?: UserEdit) {

    const dialogRef = this.dialog.open(SetUserPositionComponent, {
      data: {user: user},
     width: '600px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      console.log(res);
      if (res.result === 1) {
        this.getUsers();
        this.messageboxService.ShowMessage('Information', 'assignation effectué avec succès', user.friendlyName, 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }

  addNewUser(user?: UserEdit) {

    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {user: user},
     width: '900px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      console.log(res);
      if (res.result === 1) {
        this.getUsers();
        this.messageboxService.ShowMessage('Information', 'Utilisateur ajouter avec succès', user.friendlyName, 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }
  EditUser(user?: UserEdit) {

    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {user: user},
     width: '900px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      if (res.result === 1) {
        this.messageboxService.ShowMessage('Information', 'Informations modifiées avec succès', user.friendlyName, 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }
  resetPassword(user?: UserEdit) {
    this.messageboxService.ShowMessage('Avertissement', 'Réinitialiser le Mot de passe de  ' + user.userName, '', 2, false, 1, '520px', 'info', 'primary').subscribe(res => {
     let response: any;
     response = res;
      if (response.result === 'yes') {
        user.newPassword = '@Zerty123';
        this.accountService.resetUserPassword(user).subscribe(_res =>  {
          if (res == null) {
            this.messageboxService.ShowMessage('Information', 'Mot de passe à réinitialisé', user.friendlyName, 0, false, 1, '500px', 'info', 'primary');

          }
        }, error =>  {
          this.Error.handleError(error);
        }

        );
      } else {
        return;
      }
    }

  );
  }

}

