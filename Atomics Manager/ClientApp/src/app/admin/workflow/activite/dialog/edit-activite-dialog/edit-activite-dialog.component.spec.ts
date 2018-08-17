import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActiviteDialogComponent } from './edit-activite-dialog.component';

describe('EditActiviteDialogComponent', () => {
  let component: EditActiviteDialogComponent;
  let fixture: ComponentFixture<EditActiviteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActiviteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActiviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
