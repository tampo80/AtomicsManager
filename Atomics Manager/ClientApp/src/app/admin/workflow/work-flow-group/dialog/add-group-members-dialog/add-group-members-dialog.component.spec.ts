import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupMembersDialogComponent } from './add-group-members-dialog.component';

describe('AddGroupMembersDialogComponent', () => {
  let component: AddGroupMembersDialogComponent;
  let fixture: ComponentFixture<AddGroupMembersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupMembersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
