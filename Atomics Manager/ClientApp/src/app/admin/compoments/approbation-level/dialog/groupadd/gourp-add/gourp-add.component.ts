import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ApprobationLevelService } from '../../../../../services/approbation-level.service';
import { MessageboxService } from '../../../../../services/messagebox.service';
import { ApgMembers } from '../../../../../models/apg-members';
import { AgMembersService } from '../../../../../services/ag-members.service';
import { User } from '../../../../../models/user.model';
import { AccountService } from '../../../../../services/account.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApprobationLevel } from '../../../../../models/approbation-level';

@Component({
  selector: 'app-gourp-add',
  templateUrl: './gourp-add.component.html',
  styleUrls: ['./gourp-add.component.scss']
})
export class GourpAddComponent implements OnInit {
  removable = true;
  apgmembers: ApgMembers[] = [];
  members: User[] = [];
  filteredUsers: Observable<User[]>;
  aPGMemebersForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private snackBar: MatSnackBar, private accountService: AccountService,  private apgMemebersServices: AgMembersService, public approbationLevelService: ApprobationLevelService, private fb: FormBuilder, public dialogRef: MatDialogRef<GourpAddComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

remove(member: ApgMembers): void {
  console.log(member);
  const index = this.apgmembers.indexOf(member);
  if (index >= 0) {
    this.apgmembers.splice(index, 1);
  }
}

exist(member: ApgMembers): boolean {

  const index = this.apgmembers.find(e => e.memberId === String(member.memberId));
  console.log(index);

  console.log(member.id);

  if (index != null) {
    return true;

  } else {
    return false;
  }
}

getSelected(value: User) {
  console.log(value.id);
  const member: ApgMembers = new ApgMembers();
  member.memberId = value.id;
  member.memberUserName = value.userName;
  member.memberFullName = value.fullName;
  console.log(this.exist(member));
  if (!this.exist(member)) {
    this.apgmembers.push(member);
    this.aPGMemebersForm.get('members').setValue('');
  } else {
      this.snackBar.open('Ce membre a été déjà ajouté !', 'Info', {
        duration: 1000
      });
      this.aPGMemebersForm.get('members').setValue('');
  }

}

  ngOnInit() {
   this.getUsers();
   this.createform();
   this.getAPGMemebers(this.data.approbationLevel.id);
   this.filteredUsers = this.aPGMemebersForm.get('members').valueChanges.pipe(
    startWith<string|User>(''),
    map(value => typeof value === 'string' ? value : value.userName),
    map(userName => userName ? this._filterUsers(userName) : this.members.slice())
  );
  }

  _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.members.filter(option => option.userName.toLowerCase().indexOf(filterValue) !== -1);
  }

  displayFn(member?: User): string | undefined {
    return member ? member.userName : undefined;
  }

  createform() {
    this.aPGMemebersForm = this.fb.group({
      members: [''],
    }

    );
  }

  getUsers() {
    this.accountService.getUsers().subscribe(res => {
      this.members = res;
    });
  }
  getAPGMemebers(id: number) {
     this.apgMemebersServices.getApgMembersByAPLId(id).subscribe(res => {
       this.apgmembers = res;
     });
  }
  onNoClick(): void {
    this.dialogRef.close({result: 0});
  }

  applyGroup() {

   const apgm: APGM = new APGM();
   apgm.level = this.data.approbationLevel;
   apgm.members = this.apgmembers;
   this.apgMemebersServices.addApgMembers(apgm).subscribe(_res => {
    this.dialogRef.close({result: 1});
   });
  }

}
export class APGM {
  level: ApprobationLevel;
  members: ApgMembers[];
}
