import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaysDialogComponent } from './edit-pays-dialog.component';

describe('EditPaysDialogComponent', () => {
  let component: EditPaysDialogComponent;
  let fixture: ComponentFixture<EditPaysDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaysDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaysDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
