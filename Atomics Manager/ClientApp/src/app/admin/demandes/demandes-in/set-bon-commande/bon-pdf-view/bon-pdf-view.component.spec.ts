import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonPdfViewComponent } from './bon-pdf-view.component';

describe('BonPdfViewComponent', () => {
  let component: BonPdfViewComponent;
  let fixture: ComponentFixture<BonPdfViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonPdfViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonPdfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
