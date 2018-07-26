import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServicesDialogComponent } from './add-services-dialog.component';

describe('AddServicesDialogComponent', () => {
  let component: AddServicesDialogComponent;
  let fixture: ComponentFixture<AddServicesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServicesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServicesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
