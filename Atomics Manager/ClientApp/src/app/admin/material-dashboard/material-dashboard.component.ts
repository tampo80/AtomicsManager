import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demandes } from '../models/demandes';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

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
    constructor(private demandesServices: DemandeService) {
      this.isLoading = true;
    }
    ngOnInit() {
      this.getMesdemandesOut();
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
      this.demandesServices.getDemandesOut().subscribe(res =>  {
        this.mesdemandesOut = res;
        this.dataSource.data = res.splice(0, 3);
        this.isLoading = false;
      });
    }
}
