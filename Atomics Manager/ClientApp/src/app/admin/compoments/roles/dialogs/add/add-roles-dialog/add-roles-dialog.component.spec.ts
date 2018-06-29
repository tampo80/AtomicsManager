import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRolesDialogComponent } from './add-roles-dialog.component';

describe('AddRolesDialogComponent', () => {
  let component: AddRolesDialogComponent;
  let fixture: ComponentFixture<AddRolesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRolesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRolesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
