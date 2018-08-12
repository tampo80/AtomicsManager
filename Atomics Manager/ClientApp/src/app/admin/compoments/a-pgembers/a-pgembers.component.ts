import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { ApprobationLevelService } from '../../services/approbation-level.service';
import { ApgNodes } from './apg-nodes';
import { Apglink } from './apglink';
import { ApprobationLevel } from '../../models/approbation-level';
import { forEach } from '../../../../../node_modules/@angular/router/src/utils/collection';
import { NodeLink } from './node-link';
import { colorSets } from './color-sets';

@Component({
  selector: 'app-a-pgembers',
  templateUrl: './a-pgembers.component.html',
  styleUrls: ['./a-pgembers.component.scss']
})
export class APGembersComponent implements OnInit {
  hierarchialGraph = {nodes: [], links: []};
  nodes: ApgNodes[] = [];
  links: Apglink[] = [];


  view: any[];
  width = 900;
  height = 900;
  fitContainer = true;

  curve = shape.curveBundle.beta(1);

  colorSchemes: any = colorSets;
  colorScheme: any;
  schemeType = 'ordinal';
  selectedColorScheme: string;
  constructor(private approbationLevelService: ApprobationLevelService) {

    this.setColorScheme('picnic');
    this.width = 900;
    this.height = 900;
  }
  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSchemes.find(s => s.name === name);
  }
  ngOnInit() {
    this.width = 900;
    this.height = 900;
    this.buildNodes();
    this.buildLinks();
    this.showGraph();
  }

  buildNodes() {
    let apgLeve: ApprobationLevel[] = [];
    this.approbationLevelService.getApprobationLevel().subscribe(_res => {
       apgLeve = _res;
       let i = 0;
       apgLeve.forEach(element => {
        const nodes: ApgNodes = new ApgNodes();

        nodes.id = i === 0 ? 'start' : i.toString();
        nodes.label = element.name;
        nodes.position = 'x' + i.toString();
        i++;
        this.nodes.push(nodes);
       });
       console.log(this.nodes);

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
    this.hierarchialGraph.nodes = this.nodes;

  this.hierarchialGraph.links = this.links;

  }
}
