import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartementsService } from '../../../../services/departements.service';
import { MessageboxService } from '../../../../services/messagebox.service';
import { User } from '../../../../models/user.model';
import { AccountService } from '../../../../services/account.service';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import { Departements } from '../../../../models/departements';

@Component({
  selector: 'app-set-head-departement',
  templateUrl: './set-head-departement.component.html',
  styleUrls: ['./set-head-departement.component.scss']
})
export class SetHeadDepartementComponent implements OnInit {

  setHeadFrom: FormGroup;
  allUsers: User[] = [];
  departement: Departements = new Departements();

  actionLabel = 'Définir';


  filteredUsers: Observable<User[]>;
  constructor(private accountService: AccountService, private messageboxService: MessageboxService, public departementsService: DepartementsService, private fb: FormBuilder, public dialogRef: MatDialogRef<SetHeadDepartementComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.departement = data.depatements;
  }



  ngOnInit() {
    this.departement = this.data.departements;
    this.getAllusers();
    this.createForm();
    this.filteredUsers = this.setHeadFrom.get('head').valueChanges.pipe(
      startWith<string|User>(''),
      map(value => typeof value === 'string' ? value : value.userName),
      map(userName => userName ? this._filterUsers(userName) : this.allUsers.slice())
    );

  }

  displayFn(user?: User): string | undefined {
    return user ? user.fullName : undefined;
  }

  _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.allUsers.filter(option => option.userName.toLowerCase().indexOf(filterValue) !== -1 || option.fullName.toLowerCase().indexOf(filterValue) !== -1);
  }
  createForm() {
    this.setHeadFrom = this.fb.group({
      head: ['']
    });

  }
  onNoClick(): void {
    this.dialogRef.close({result: 0});
  }

  onSubmit(){


  }

  getAllusers() {
    this.accountService.getUsers().subscribe(res => {
      this.allUsers = res;
    });
  }
}
