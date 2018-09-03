import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptesInternesComponent } from './comptes-internes.component';

describe('ComptesInternesComponent', () => {
  let component: ComptesInternesComponent;
  let fixture: ComponentFixture<ComptesInternesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptesInternesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptesInternesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
