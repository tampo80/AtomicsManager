import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransitionDialogComponent } from './edit-transition-dialog.component';

describe('EditTransitionDialogComponent', () => {
  let component: EditTransitionDialogComponent;
  let fixture: ComponentFixture<EditTransitionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransitionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransitionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
