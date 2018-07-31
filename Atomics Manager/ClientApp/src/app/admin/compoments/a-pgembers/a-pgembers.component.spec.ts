import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APGembersComponent } from './a-pgembers.component';

describe('APGembersComponent', () => {
  let component: APGembersComponent;
  let fixture: ComponentFixture<APGembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APGembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APGembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
