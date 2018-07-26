import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartementsComponent } from './add-departements.component';

describe('AddDepartementsComponent', () => {
  let component: AddDepartementsComponent;
  let fixture: ComponentFixture<AddDepartementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDepartementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
