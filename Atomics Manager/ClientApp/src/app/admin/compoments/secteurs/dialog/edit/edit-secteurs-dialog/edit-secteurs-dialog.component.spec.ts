import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecteursDialogComponent } from './edit-secteurs-dialog.component';

describe('EditSecteursDialogComponent', () => {
  let component: EditSecteursDialogComponent;
  let fixture: ComponentFixture<EditSecteursDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSecteursDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSecteursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
