import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetBonCommandeComponent } from './set-bon-commande.component';

describe('SetBonCommandeComponent', () => {
  let component: SetBonCommandeComponent;
  let fixture: ComponentFixture<SetBonCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetBonCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetBonCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
