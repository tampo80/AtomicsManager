import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeComptesDialogComponent } from './add-type-comptes-dialog.component';

describe('AddTypeComptesDialogComponent', () => {
  let component: AddTypeComptesDialogComponent;
  let fixture: ComponentFixture<AddTypeComptesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeComptesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeComptesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
