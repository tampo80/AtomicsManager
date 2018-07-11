import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFournisseursDialogComponent } from './add-fournisseurs-dialog.component';

describe('AddFournisseursDialogComponent', () => {
  let component: AddFournisseursDialogComponent;
  let fixture: ComponentFixture<AddFournisseursDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFournisseursDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFournisseursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
