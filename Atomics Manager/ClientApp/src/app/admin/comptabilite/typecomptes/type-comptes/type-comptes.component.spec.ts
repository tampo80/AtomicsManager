import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeComptesComponent } from './type-comptes.component';

describe('TypeComptesComponent', () => {
  let component: TypeComptesComponent;
  let fixture: ComponentFixture<TypeComptesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeComptesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
