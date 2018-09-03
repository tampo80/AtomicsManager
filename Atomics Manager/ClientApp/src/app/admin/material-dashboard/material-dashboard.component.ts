import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demandes } from '../models/demandes';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SignalRService } from '../signalr/signal-r.service';
import { ok } from 'assert';
import { Data } from '../signalr/data';
import { ConfigService } from '../services/config.service';
import { DetailsDemandesInComponent } from '../demandes/demandes-in/details-demandes-in/details-demandes-in.component';

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
  displayedColumns = ['id', 'productName', 'userFullName', 'serviceName', 'agenceName', 'montant', 'currentStatName', 'dateDemande', 'actions'];
  isLoading: boolean;
  devise = ConfigService.Devise;

    constructor(private signalrService: SignalRService, private demandesServices: DemandeService, private dialog: MatDialog, private _ngZone: NgZone  ) {
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

  demandesView(demande: Demandes) {

    const dialogRef = this.dialog.open(DetailsDemandesInComponent, {
      data: {demande: demande},
      panelClass: 'atomics-dialog-container',
      width: '920px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res.result === 1) {
        this.getMesdemandesOut();
        /// this.messageboxService.ShowMessage("Information","Departements ajouter avec succès","",0,false,1,'500px',"info",'primary');
      }
    }


    );
  }
}
