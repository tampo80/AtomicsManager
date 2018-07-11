import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankInfosComponent } from './bank-infos.component';

describe('BankInfosComponent', () => {
  let component: BankInfosComponent;
  let fixture: ComponentFixture<BankInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
