import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demandes } from '../models/demandes';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SignalRService } from '../signalr/signal-r.service';
import { ok } from 'assert';
import { Data } from '../signalr/data';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'material-dashboard',
  templateUrl: './material-dashboard.component.html',
  styleUrls: ['./material-dashboard.component.scss']
})
export class MaterialDashboardComponent implements OnInit, AfterViewInit {

    mesdemandesOut: Demandes[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'productName', 'userFullName', 'montant', 'statut', 'dateDemande', 'actions'];
  isLoading: boolean;


    constructor(private signalrService: SignalRService, private demandesServices: DemandeService, private _ngZone: NgZone  ) {
      this.isLoading = true;


    }
    ngOnInit() {
      this.getMesdemandesOut();
      this.subscribeToEvents();
    }
    ngAfterViewInit() {

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  rowClicked(row: any): void {
    console.log(row);
  }
    getMesdemandesOut() {
      this.demandesServices.getDemandesIn().subscribe(res =>  {
        this.mesdemandesOut = res;
        this.dataSource.data = res.splice(0, 3);
        this.isLoading = false;
      });
    }


    private subscribeToEvents(): void {
      this.signalrService.connectionEstablished.subscribe(() => {
       console.log(ok);
      });


    this.signalrService.messageReceived.subscribe((data: Data) => {
      this._ngZone.run(() => {

      });
    });

  }
}
