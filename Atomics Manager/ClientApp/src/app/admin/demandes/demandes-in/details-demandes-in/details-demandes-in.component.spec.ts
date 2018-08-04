import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDemandesInComponent } from './details-demandes-in.component';

describe('DetailsDemandesInComponent', () => {
  let component: DetailsDemandesInComponent;
  let fixture: ComponentFixture<DetailsDemandesInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDemandesInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDemandesInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
