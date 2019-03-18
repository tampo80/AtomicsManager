import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-cytoscape',
  templateUrl: './graph-cytoscape.component.html',
  styleUrls: ['./graph-cytoscape.component.scss']
})
export class GraphCytoscapeComponent implements OnInit {
  private _graphData: any = {
    nodes: [
      { data: { id: 'a', name: 'Signup', weight: 100, colorCode: 'blue', shapeType: 'roundrectangle' } },
      { data: { id: 'b', name: 'User Profile', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle' } },
      { data: { id: 'c', name: 'Billing', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle' } },
      { data: { id: 'd', name: 'Sales', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
      { data: { id: 'e', name: 'Referral', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
      { data: { id: 'f', name: 'Loan', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
      { data: { id: 'j', name: 'Support', weight: 100, colorCode: 'red', shapeType: 'ellipse' } },
      { data: { id: 'k', name: 'Sink Event', weight: 100, colorCode: 'green', shapeType: 'ellipse' } }
  ],
  edges: [
      { data: { source: 'a', target: 'b', colorCode: 'blue', strength: 10 } },
      { data: { source: 'b', target: 'c', colorCode: 'blue', strength: 10 } },
      { data: { source: 'c', target: 'd', colorCode: 'blue', strength: 10 } },
      { data: { source: 'c', target: 'e', colorCode: 'blue', strength: 10 } },
      { data: { source: 'c', target: 'f', colorCode: 'blue', strength: 10 } },
      { data: { source: 'e', target: 'j', colorCode: 'red', strength: 10 } },
      { data: { source: 'e', target: 'k', colorCode: 'green', strength: 10 } }
  ]

  };

  private _style = {
    style: [
      {
      selector: 'node',
      style: {
        'content': 'data(id)',
        'width': 200,
        'height': 50,
        'text-opacity': 1,
        'text-valign': 'center',
        'text-halign': 'center',
        'shape': 'square',
        'label': 'data(id)',
        'background-color': '#11479e',
        'color': 'white'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 7,
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'line-color': '#9dbaea'
      }
    },
      {
        selector: ':selected',
        style: {
          'background-color': 'yellow',
          'line-color': 'yellow',
          'target-arrow-color': 'yellow',
          'source-arrow-color': 'yellow',
        }
      }
    ]
  };

  constructor() {
  }

  ngOnInit() {
  }

  get graphData(): any {
    return this._graphData;
  }

  set graphData(value: any) {
    this._graphData = value;
  }


  get mystyle(): any {
    return this._style;
  }

  set mystyle(value: any) {
    this._style = value;
  }
}
