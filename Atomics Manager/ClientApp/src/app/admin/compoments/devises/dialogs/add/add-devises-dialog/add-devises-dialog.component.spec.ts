import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDevisesDialogComponent } from './add-devises-dialog.component';

describe('AddDevisesDialogComponent', () => {
  let component: AddDevisesDialogComponent;
  let fixture: ComponentFixture<AddDevisesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDevisesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDevisesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
