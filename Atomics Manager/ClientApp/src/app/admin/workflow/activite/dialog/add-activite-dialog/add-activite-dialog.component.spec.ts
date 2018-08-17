import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActiviteDialogComponent } from './add-activite-dialog.component';

describe('AddActiviteDialogComponent', () => {
  let component: AddActiviteDialogComponent;
  let fixture: ComponentFixture<AddActiviteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActiviteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActiviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
