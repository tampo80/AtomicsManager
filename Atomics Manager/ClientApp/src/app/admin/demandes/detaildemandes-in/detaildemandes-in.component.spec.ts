import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildemandesInComponent } from './detaildemandes-in.component';

describe('DetaildemandesInComponent', () => {
  let component: DetaildemandesInComponent;
  let fixture: ComponentFixture<DetaildemandesInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaildemandesInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaildemandesInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
