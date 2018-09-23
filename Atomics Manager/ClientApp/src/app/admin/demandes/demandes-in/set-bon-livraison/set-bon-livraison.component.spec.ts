import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetBonLivraisonComponent } from './set-bon-livraison.component';

describe('SetBonLivraisonComponent', () => {
  let component: SetBonLivraisonComponent;
  let fixture: ComponentFixture<SetBonLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetBonLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetBonLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
