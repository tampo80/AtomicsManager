import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgencesDialogComponent } from './edit-agences-dialog.component';

describe('EditAgencesDialogComponent', () => {
  let component: EditAgencesDialogComponent;
  let fixture: ComponentFixture<EditAgencesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAgencesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAgencesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
