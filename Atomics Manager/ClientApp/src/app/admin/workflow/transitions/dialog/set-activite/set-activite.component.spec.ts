import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetActiviteComponent } from './set-activite.component';

describe('SetActiviteComponent', () => {
  let component: SetActiviteComponent;
  let fixture: ComponentFixture<SetActiviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetActiviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
