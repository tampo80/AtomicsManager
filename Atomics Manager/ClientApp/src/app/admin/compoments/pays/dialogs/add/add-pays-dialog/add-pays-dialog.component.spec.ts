import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaysDialogComponent } from './add-pays-dialog.component';

describe('AddPaysDialogComponent', () => {
  let component: AddPaysDialogComponent;
  let fixture: ComponentFixture<AddPaysDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaysDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaysDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
