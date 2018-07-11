import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSecteursDialogComponent } from './add-secteurs-dialog.component';

describe('AddSecteursDialogComponent', () => {
  let component: AddSecteursDialogComponent;
  let fixture: ComponentFixture<AddSecteursDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSecteursDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSecteursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
