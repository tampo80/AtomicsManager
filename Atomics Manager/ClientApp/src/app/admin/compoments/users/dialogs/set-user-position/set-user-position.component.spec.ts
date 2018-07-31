import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUserPositionComponent } from './set-user-position.component';

describe('SetUserPositionComponent', () => {
  let component: SetUserPositionComponent;
  let fixture: ComponentFixture<SetUserPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUserPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUserPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
