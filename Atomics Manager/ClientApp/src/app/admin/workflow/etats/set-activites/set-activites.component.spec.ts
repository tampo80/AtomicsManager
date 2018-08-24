import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetActivitesComponent } from './set-activites.component';

describe('SetActiviteComponent', () => {
  let component: SetActivitesComponent;
  let fixture: ComponentFixture<SetActivitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetActivitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
