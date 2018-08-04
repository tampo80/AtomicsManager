import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GourpAddComponent } from './gourp-add.component';

describe('GourpAddComponent', () => {
  let component: GourpAddComponent;
  let fixture: ComponentFixture<GourpAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GourpAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GourpAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
