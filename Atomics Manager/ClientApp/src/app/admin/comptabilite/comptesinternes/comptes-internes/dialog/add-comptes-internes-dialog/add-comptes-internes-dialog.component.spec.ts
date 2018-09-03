import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComptesInternesDialogComponent } from './add-comptes-internes-dialog.component';

describe('AddComptesInternesDialogComponent', () => {
  let component: AddComptesInternesDialogComponent;
  let fixture: ComponentFixture<AddComptesInternesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComptesInternesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComptesInternesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
