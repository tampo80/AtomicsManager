import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demandes } from '../models/demandes';

@Component({
  selector: 'material-dashboard',
  templateUrl: './material-dashboard.component.html',
  styleUrls: ['./material-dashboard.component.scss']
})
export class MaterialDashboardComponent implements OnInit{

    mesdemandesOut:Demandes[]=[];
    constructor(private demandesServices:DemandeService){

    }
    ngOnInit() {
      this.getMesdemandesOut();
    }

    getMesdemandesOut()
    {
      this.demandesServices.getDemandes().subscribe(res=>{
        this.mesdemandesOut=res;
      })
    }
}
