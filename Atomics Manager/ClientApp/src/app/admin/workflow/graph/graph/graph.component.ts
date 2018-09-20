import { Component, OnInit } from '@angular/core';
import { TransitionService } from '../../services/transition.service';
import { EtatService } from '../../services/etat.service';
import { Etat } from '../../models/etat';
import { TypeEtat } from '../../config/type-etat.enum';
import { TransitionAction } from '../../models/transition-action';
import { Transition } from '../../models/transition';
import * as shape from 'd3-shape';
import { NgxGraphModule } from '@swimlane/ngx-graph';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  hierarchialGraph = {nodes: [], links: []};
  nodes: any[] = [];
  links: any[] = [];
  startNodeId: number;
  transitionAction: TransitionAction[] = [];
  curve = shape.curveMonotoneX;
  constructor(private transitionService: TransitionService, private etatService: EtatService) {


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
          nodes.label = el.name;
          nodes.position = 'x' + el.id.toString();

          this.nodes.push(nodes);
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


        this.links.push(link);
      });

      console.log(this.links);
      this.showGraph();
    });
  }

  showGraph() {

    this.hierarchialGraph.nodes = this.nodes;

    this.hierarchialGraph.links = this.links;

  }
}
