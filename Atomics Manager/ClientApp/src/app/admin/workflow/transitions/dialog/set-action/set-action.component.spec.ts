import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetActionComponent } from './set-action.component';

describe('SetActionComponent', () => {
  let component: SetActionComponent;
  let fixture: ComponentFixture<SetActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
