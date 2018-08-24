import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetActionTargetComponent } from './set-action-target.component';

describe('SetActionTargetComponent', () => {
  let component: SetActionTargetComponent;
  let fixture: ComponentFixture<SetActionTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetActionTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetActionTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
