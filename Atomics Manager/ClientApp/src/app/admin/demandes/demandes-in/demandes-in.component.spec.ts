import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesInComponent } from './demandes-in.component';

describe('DemandesInComponent', () => {
  let component: DemandesInComponent;
  let fixture: ComponentFixture<DemandesInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandesInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
