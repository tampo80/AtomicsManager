import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { ApprobationLevelService } from '../../services/approbation-level.service';
import { ApgNodes } from './apg-nodes';
import { Apglink } from './apglink';
import { ApprobationLevel } from '../../models/approbation-level';
import { forEach } from '@angular/router/src/utils/collection';
import { NodeLink } from './node-link';
import { colorSets } from './color-sets';
import { Etat } from '../../workflow/models/etat';
import { EtatService } from '../../workflow/services/etat.service';
import { element } from '../../../../../node_modules/protractor';
import { TypeEtat } from '../../workflow/config/type-etat.enum';
import { TransitionActionService } from '../../workflow/services/transition-action.service';
import { TransitionService } from '../../workflow/services/transition.service';
import { Transition } from '../../workflow/models/transition';
import { TransitionAction } from '../../workflow/models/transition-action';
import { Actions } from '../../workflow/models/actions';
import { ActionsService } from '../../workflow/services/actions.service';
import { Subject } from '../../../../../node_modules/rxjs';
import chartGroups from './chart-types';

@Component({
  selector: 'app-a-pgembers',
  templateUrl: './a-pgembers.component.html',
  styleUrls: ['./a-pgembers.component.scss']
})
export class APGembersComponent implements OnInit {
  theme = 'dark';
  hierarchialGraph = {nodes: [], links: []};
  nodes: ApgNodes[] = [];
   links: Apglink[] = [];
   startNodeId: number;
   chartType = 'directed-graph';
   chartTypeGroups: any;
   chart: any;
   view: any[];
   width = 700;
   height = 300;
   fitContainer = true;
   autoZoom = false;
   panOnZoom = true;
   enableZoom = true;
   autoCenter = true;

   // observables
  update$: Subject<any> = new Subject();
  center$: Subject<any> = new Subject();
  zoomToFit$: Subject<any> = new Subject();

  // options
  showLegend = true;
  orientation = 'LR'; // LR, RL, TB, BT

  orientations: any[] = [
    {
      label: 'Left to Right',
      value: 'LR'
    },
    {
      label: 'Right to Left',
      value: 'RL'
    },
    {
      label: 'Top to Bottom',
      value: 'TB'
    },
    {
      label: 'Bottom to Top',
      value: 'BT'
    }
  ];

  // line interpolation
  curveType = 'Monotone X';
  curve: any = shape.curveMonotoneX;
  interpolationTypes = [
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];

  // curve = shape.curveBundle.beta(1);

  colorSchemes: any = colorSets;
  colorScheme: any;
  schemeType = 'ordinal';
  selectedColorScheme: string;

  transitionAction: TransitionAction[] = [];
  actions: Actions[] = [];
  constructor(private actionService: ActionsService, private transitionService: TransitionService, private etatService: EtatService, private approbationLevelService: ApprobationLevelService) {

    this.setColorScheme('picnic');
    this.width = 900;
    this.height = 900;
  }
  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSchemes.find(s => s.name === name);
  }
  ngOnInit() {
    this.getTransitonsAction();
    this.width = 900;
    this.height = 900;
    this.chartTypeGroups = chartGroups,
    this.selectChart(this.chartType);
    this.NewBuildNod();
    if (!this.fitContainer) {
      this.applyDimensions();
    }

   // this.showGraph();
  }
  applyDimensions() {
    this.view = [this.width, this.height];
  }

  toggleEnableZoom(enableZoom: boolean) {
    this.enableZoom = enableZoom;
  }

  toggleFitContainer(fitContainer: boolean, autoZoom: boolean, autoCenter: boolean): void {
    this.fitContainer = fitContainer;
    this.autoZoom = autoZoom;
    this.autoCenter = autoCenter;

    if (this.fitContainer) {
      this.view = undefined;
    } else {
      this.applyDimensions();
    }
  }

  selectChart(chartSelector) {
    this.chartType = chartSelector;

    for (const group of this.chartTypeGroups) {
      for (const chart of group.charts) {
        if (chart.selector === chartSelector) {
          this.chart = chart;
          return;
        }
      }
    }
  }

  select(data) {
    console.log('Item clicked', data);
  }


  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  toggleExpand(node) {
    console.log('toggle expand', node);
  }

  updateChart() {
    this.update$.next(true);
  }

  zoomToFit() {
    this.zoomToFit$.next(true);
  }

  center() {
    this.center$.next(true);
  }

  buildNodes() {
    let apgLeve: ApprobationLevel[] = [];
    this.approbationLevelService.getApprobationLevel().subscribe(_res => {
       apgLeve = _res;
       let i = 0;
       apgLeve.forEach(elem => {
        const nodes: ApgNodes = new ApgNodes();

        nodes.id = i === 0 ? 'start' : i.toString();
        nodes.label = elem.name;
        nodes.position = 'x' + i.toString();
        i++;
        this.nodes.push(nodes);
       });
       console.log(this.nodes);

    });

  }



  NewBuildNod() {
    let etat: Etat[] = [];
    this.etatService.getEtat().subscribe(
      response => {
        etat = response;
        response.forEach(el => {
          const nodes: ApgNodes = new ApgNodes();
          if (el.typeEtats === TypeEtat.Debut) {
            this.startNodeId = el.id;
          }
          nodes.id = el.typeEtats === TypeEtat.Debut ? 'start' : el.id.toString();
          nodes.label = el.name;
          nodes.position = 'x' + el.id.toString();

          this.nodes.push(nodes);
        });
        this.NewbuildLinks();
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
        const link: Apglink = new Apglink();
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
  buildLinks() {
    let apgLeve: ApprobationLevel[] = [];
    this.approbationLevelService.getApprobationLevel().subscribe(_res => {
       apgLeve = _res;
       const nodeLink: NodeLink [] = [];
       for (let index = 0; index < apgLeve.length; index++) {
             console.log(index);
           const nb = this.getLinkCount(apgLeve, apgLeve[index].level);
           let link: Apglink = new Apglink();


           const j = index - 1 ;
           const t = index;
           const source = this.links.length <= 0 ? 'start' : this.links[this.links.length - 1].source;
           if (nb > 1) {

             for (let i = 1; i < nb; i++) {


              link.source = source;
              link.target = (t + 1).toString();

              this.links.push(link);
              if ( i === (nb - 1)) {
                index ++ ;
              }


             }
             let nbr = 1;
             for (let i = 0; i < nb; i++) {



               const target = this.links.length <= 0 ? 'start' : this.links[this.links.length - (nbr + i)].target;
               link = new Apglink();

              link.source = target ;
              link.target =  (t  + nb ).toString();

              this.links.push(link);
              nbr++;


             }


           } else {
            link.source = index === 0 ? 'start' : index.toString();
            if (index === apgLeve.length - 1) {
              link.target = 'start';
             } else {
              link.target = (index + 1).toString();
             }

           }




           this.links.push(link);

       }

console.log(this.links);
    });
  }

  getLinkCount(apgLeve: ApprobationLevel[], level: number): number {
  const aL: ApprobationLevel[] = apgLeve.filter(e => e.level === level);

  return aL.length;
  }

  showGraph() {
    this.width = 900;
    this.height = 900;
    this.hierarchialGraph.nodes = this.nodes;

    this.hierarchialGraph.links = this.links;

  }
}
