import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillesDemandeComponent } from './detailles-demande.component';

describe('DetaillesDemandeComponent', () => {
  let component: DetaillesDemandeComponent;
  let fixture: ComponentFixture<DetaillesDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaillesDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaillesDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
