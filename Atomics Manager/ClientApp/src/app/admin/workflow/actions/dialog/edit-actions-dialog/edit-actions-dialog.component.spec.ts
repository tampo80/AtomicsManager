import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionsDialogComponent } from './edit-actions-dialog.component';

describe('EditActionsDialogComponent', () => {
  let component: EditActionsDialogComponent;
  let fixture: ComponentFixture<EditActionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
