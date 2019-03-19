
import { Component,OnInit } from '@angular/core';
import { TransitionService } from '../../services/transition.service';
import { EtatService } from '../../services/etat.service';
import { Etat } from '../../models/etat';
import { TransitionAction } from '../../models/transition-action';
import { Transition } from '../../models/transition';
import { TypeEtat } from '../../config/type-etat.enum';



@Component({
  selector: 'app-graph-cytoscape',
  templateUrl: './graph-cytoscape.component.html',
  styleUrls: ['./graph-cytoscape.component.scss']
})
export class GraphCytoscapeComponent  implements OnInit  {

  node_name: string;

  layout = {
              name: 'circle',
              rankDir: 'LR',
              directed: true,
              padding: 30,
              avoidOverlap: true,
              avoidOverlapPadding: 10,
              nodeDimensionsIncludeLabels: true,
          };

 /* graphData = {
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
  }; */
  style = [
    {
      selector: 'edge',
      style: {
        'width': 2,
        'target-arrow-color': '#ffb300',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'line-color': '#0d47a1',
        'label': 'data(label)',
        'font-size': 9,
        'color': '#ff3d00',
        'source-text-offset': 15,

        'text-valign': 'bottom',
        'text-halign': 'right'
      }
    },
    {
      selector: 'node',
      style: {
        'content': 'data(name)',
        'width': 150,
        'height': 35,
        'font-size': 12,
        'text-opacity': 1,
        'text-valign': 'center',
        'text-halign': 'center',
        'shape': 'round-rectangle',
        'label': 'data(name)',
        'background-color': '#007c91',
        'color': 'white',
        'border-width': 1,
        'border-color': '#ff8f00',
        'border-style': 'solid',

      }
    },{
      selector: ':selected',
      style: {
        'background-color': '#1565c0',
        'line-color': 'yellow',
        'target-arrow-color': 'yellow',
        'source-arrow-color': 'yellow',
      }
    }

  ];
  graphData = {nodes: [], edges: []};
  nodes: any[] = [];
  edges: any[] = [];
  startNodeId: number;
  transitionAction: TransitionAction[] = [];

  constructor(private transitionService: TransitionService, private etatService: EtatService) {
  }

  nodeChange(event) {
      this.node_name = event;
  }


  ngOnInit() {
    this.NewBuildNod();
    this.getTransitonsAction();
  }

  NewBuildNod() {
    let etat: Etat[] = [];
    this.etatService.getEtat().subscribe(
      response => {
        etat = response;
        response.forEach(el => {
          const nodes: any = {};
          if (el.typeEtats === TypeEtat.Debut) {
            this.startNodeId = el.id;
          }
          nodes.id = el.typeEtats === TypeEtat.Debut ? 'start' : el.id.toString();
          nodes.name = el.name;
          nodes.colorCode = 'x' + el.id.toString();

          this.nodes.push({data:nodes});
        });

      }
    );
  }

 getTransitonsAction() {
   this.transitionService.getTransitionAction().subscribe(response => {
      this.transitionAction = response;
      this.NewbuildLinks();
   });
 }

 getAction(id) {
  const TA: TransitionAction[] = this.transitionAction.filter(e => e.transitionId === id);


  return TA;



 }
  NewbuildLinks() {
    let apgLeve: Transition[] = [];
    this.transitionService.getTransition().subscribe(response => {
      apgLeve = response;


      apgLeve.forEach(el => {
        const link: any = {};
        const ac: TransitionAction[] = this.getAction(el.id);
        ac.forEach(e => {
          link.source = el.etatActuelId === this.startNodeId ? 'start' : el.etatActuelId.toString();
          link.target = el.etatSuivantId === this.startNodeId ? 'start' : el.etatSuivantId.toString();
          link.label = e.actionsName;
        });


        this.edges.push({data:link});
      });

      console.log(this.edges);
      this.showGraph();
    });
  }


  showGraph() {

    // this.graphData.nodes = this.nodes;

    // this.graphData.edges = this.edges;
    this.graphData={nodes:this.nodes,edges:this.edges};
/*
    this.graphData=  { nodes: [ {data: { id: "1", name: "Début", colorCode: "x1" } }, { data: { id: "2", name: "Visa du Manager", colorCode: "x2" } }, { data: { id: "3", name: "Visa du Sr Manager", colorCode: "x3" } }, { data: { id: "4", name: "4", colorCode: "x4" } } ],
                       edges: [ { data: { "source": "1", "target": "2" } }, { data: { "source": "2", "target": "1" } }, { data: { "source": "2", "target": "3" } }, { data: { "source": "3", "target": "1" } }, { data: { "source": "3", "target": "4" } }]  };
 */
  }
}
