import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVillesDialogComponent } from './edit-villes-dialog.component';

describe('EditVillesDialogComponent', () => {
  let component: EditVillesDialogComponent;
  let fixture: ComponentFixture<EditVillesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVillesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVillesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
