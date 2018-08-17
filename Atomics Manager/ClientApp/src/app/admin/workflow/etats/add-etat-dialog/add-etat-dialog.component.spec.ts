import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtatDialogComponent } from './add-etat-dialog.component';

describe('AddEtatDialogComponent', () => {
  let component: AddEtatDialogComponent;
  let fixture: ComponentFixture<AddEtatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEtatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEtatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
