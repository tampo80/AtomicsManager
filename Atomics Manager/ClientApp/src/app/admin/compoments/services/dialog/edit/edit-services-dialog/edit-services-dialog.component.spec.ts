import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServicesDialogComponent } from './edit-services-dialog.component';

describe('EditServicesDialogComponent', () => {
  let component: EditServicesDialogComponent;
  let fixture: ComponentFixture<EditServicesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditServicesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServicesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
