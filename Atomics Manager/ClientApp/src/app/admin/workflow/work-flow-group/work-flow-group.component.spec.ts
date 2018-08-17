import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowGroupComponent } from './work-flow-group.component';

describe('WorkFlowGroupComponent', () => {
  let component: WorkFlowGroupComponent;
  let fixture: ComponentFixture<WorkFlowGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
