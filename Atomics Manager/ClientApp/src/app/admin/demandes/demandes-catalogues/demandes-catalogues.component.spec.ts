import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesCataloguesComponent } from './demandes-catalogues.component';

describe('DemandesCataloguesComponent', () => {
  let component: DemandesCataloguesComponent;
  let fixture: ComponentFixture<DemandesCataloguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandesCataloguesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesCataloguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
