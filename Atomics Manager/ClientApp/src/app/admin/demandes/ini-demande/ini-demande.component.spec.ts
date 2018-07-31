import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniDemandeComponent } from './ini-demande.component';

describe('IniDemandeComponent', () => {
  let component: IniDemandeComponent;
  let fixture: ComponentFixture<IniDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
