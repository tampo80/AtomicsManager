import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgencesDialogComponent } from './add-agences-dialog.component';

describe('AddAgencesDialogComponent', () => {
  let component: AddAgencesDialogComponent;
  let fixture: ComponentFixture<AddAgencesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAgencesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgencesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
