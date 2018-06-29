import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRolesDialogComponent } from './edit-roles-dialog.component';

describe('EditRolesDialogComponent', () => {
  let component: EditRolesDialogComponent;
  let fixture: ComponentFixture<EditRolesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRolesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRolesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
