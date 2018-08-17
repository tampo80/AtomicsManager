import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEtatDialogComponent } from './edit-etat-dialog.component';

describe('EditEtatDialogComponent', () => {
  let component: EditEtatDialogComponent;
  let fixture: ComponentFixture<EditEtatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEtatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEtatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
