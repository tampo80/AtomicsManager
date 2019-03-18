import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetHeadDepartementComponent } from './set-head-departement.component';

describe('SetHeadDepartementComponent', () => {
  let component: SetHeadDepartementComponent;
  let fixture: ComponentFixture<SetHeadDepartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetHeadDepartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetHeadDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
