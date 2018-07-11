import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVillesDialogComponent } from './add-villes-dialog.component';

describe('AddVillesDialogComponent', () => {
  let component: AddVillesDialogComponent;
  let fixture: ComponentFixture<AddVillesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVillesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVillesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
