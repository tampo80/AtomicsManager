import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFournisseursDialogComponent } from './edit-fournisseurs-dialog.component';

describe('EditFournisseursDialogComponent', () => {
  let component: EditFournisseursDialogComponent;
  let fixture: ComponentFixture<EditFournisseursDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFournisseursDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFournisseursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
