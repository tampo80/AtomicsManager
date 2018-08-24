import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetActiviteTargetComponent } from './set-activite-target.component';

describe('SetActiviteTargetComponent', () => {
  let component: SetActiviteTargetComponent;
  let fixture: ComponentFixture<SetActiviteTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetActiviteTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetActiviteTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
