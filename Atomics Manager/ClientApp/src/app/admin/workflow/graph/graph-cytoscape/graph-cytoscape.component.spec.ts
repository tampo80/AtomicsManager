import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphCytoscapeComponent } from './graph-cytoscape.component';

describe('GraphCytoscapeComponent', () => {
  let component: GraphCytoscapeComponent;
  let fixture: ComponentFixture<GraphCytoscapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphCytoscapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphCytoscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
