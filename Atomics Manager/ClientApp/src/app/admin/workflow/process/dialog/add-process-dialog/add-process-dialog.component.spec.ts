import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcessDialogComponent } from './add-process-dialog.component';

describe('AddProcessDialogComponent', () => {
  let component: AddProcessDialogComponent;
  let fixture: ComponentFixture<AddProcessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProcessDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProcessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
