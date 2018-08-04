import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOwndemandesComponent } from './detail-owndemandes.component';

describe('DetailOwndemandesComponent', () => {
  let component: DetailOwndemandesComponent;
  let fixture: ComponentFixture<DetailOwndemandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailOwndemandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOwndemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
