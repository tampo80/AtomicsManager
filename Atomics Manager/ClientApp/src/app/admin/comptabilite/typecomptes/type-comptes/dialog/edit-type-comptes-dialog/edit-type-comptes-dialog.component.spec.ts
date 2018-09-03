import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeComptesDialogComponent } from './edit-type-comptes-dialog.component';

describe('EditTypeComptesDialogComponent', () => {
  let component: EditTypeComptesDialogComponent;
  let fixture: ComponentFixture<EditTypeComptesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeComptesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeComptesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
