import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../../models/user.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountService } from '../../../../services/account.service';
import { startWith, map } from 'rxjs/operators';
import { GroupMembers } from '../../../models/group-members';
import { GroupMembersService } from '../../../services/group-members.service';
import { GroupService } from '../../../services/group.service';
import { Group } from '../../../models/group';

@Component({
  selector: 'app-add-group-members-dialog',
  templateUrl: './add-group-members-dialog.component.html',
  styleUrls: ['./add-group-members-dialog.component.scss']
})
export class AddGroupMembersDialogComponent implements OnInit {
  removable = true;
  apgmembers: GroupMembers[] = [];
  members: User[] = [];
  filteredUsers: Observable<User[]>;
  agroupMemberForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private snackBar: MatSnackBar, private accountService: AccountService,  private groupMembersServices: GroupMembersService, public groupServices: GroupService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddGroupMembersDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

remove(member: GroupMembers): void {
  console.log(member);
  const index = this.apgmembers.indexOf(member);
  if (index >= 0) {
    this.apgmembers.splice(index, 1);
  }
}

exist(member: GroupMembers): boolean {

  const index = this.apgmembers.find(e => e.userId === member.userId );
  console.log(index);

  console.log(member.userId);

  if (index != null) {
    return true;

  } else {
    return false;
  }
}

getSelected(value: User) {
  console.log(value.id);
  const member: GroupMembers = new GroupMembers();
  member.userId = value.id;
  member.userUserName = value.userName;
  member.userFullName = value.fullName;
  console.log(this.exist(member));
  if (!this.exist(member)) {
    this.apgmembers.push(member);
    this.agroupMemberForm.get('members').setValue('');
  } else {
      this.snackBar.open('Ce membre a été déjà ajouté !', 'Info', {
        duration: 1000
      });
      this.agroupMemberForm.get('members').setValue('');
  }

}
close() {
  this.dialogRef.close({result: 0});
}

  ngOnInit() {
   this.getUsers();
   this.createform();
   this.getAgroupMember(this.data.group.id);
   this.filteredUsers = this.agroupMemberForm.get('members').valueChanges.pipe(
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
    this.agroupMemberForm = this.fb.group({
      members: [''],
    }

    );
  }

  getUsers() {
    this.accountService.getUsers().subscribe(res => {
      this.members = res;
    });
  }
  getAgroupMember(id: number) {
     this.groupMembersServices.getGroupMembersByAPLId(id).subscribe(res => {
       this.apgmembers = res;
     });
  }
  onNoClick(): void {
    this.dialogRef.close({result: 0});
  }

  applyGroup() {

   const apgm: APGM = new APGM();
   apgm.group = this.data.group;
   apgm.members = this.apgmembers;
   this.groupMembersServices.addGroupMembers(apgm).subscribe(_res => {
    this.dialogRef.close({result: 1});
   });
  }

}
export class APGM {
  group: Group;
  members: GroupMembers[];
}
