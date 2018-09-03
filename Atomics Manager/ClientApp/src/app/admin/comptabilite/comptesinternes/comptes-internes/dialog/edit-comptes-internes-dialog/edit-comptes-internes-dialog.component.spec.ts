import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComptesInternesDialogComponent } from './edit-comptes-internes-dialog.component';

describe('EditComptesInternesDialogComponent', () => {
  let component: EditComptesInternesDialogComponent;
  let fixture: ComponentFixture<EditComptesInternesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComptesInternesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComptesInternesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
