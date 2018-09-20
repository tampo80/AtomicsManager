import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Demandes } from '../../models/demandes';
import { DetailOwndemandesComponent } from '../mes-demandes/detail-owndemandes/detail-owndemandes.component';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DemandeService } from '../../services/demande.service';
import { MessageboxService } from '../../services/messagebox.service';
import { STATUT } from '../../config';
import { DetailsDemandesInComponent } from './details-demandes-in/details-demandes-in.component';
import { FacturesComponent } from './setFacture/factures/factures.component';

@Component({
  selector: 'app-demandes-in',
  templateUrl: './demandes-in.component.html',
  styleUrls: ['./demandes-in.component.scss']
})
export class DemandesInComponent implements OnInit, AfterViewInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'productName', 'userFullName', 'serviceName', 'agenceName', 'montant', 'currentStatName', 'dateDemande', 'actions'];
  isLoading: boolean;
  statut = STATUT;
  isServiceGeneraux: boolean;
  isFinCon: boolean;

  constructor(private demandesServices: DemandeService, private messageboxService: MessageboxService, private dialog: MatDialog) {
    this.isLoading = true;
   }

   getStatut(value) {
     return STATUT.find(e => e.value === value);
   }

   getMesdemandesOut() {
      this.demandesServices.getDemandesOut().subscribe(res => {
        // this.mesdemandesOut=res;
        this.dataSource.data = res;
        this.isLoading = false;
      });
    }

  ngOnInit() {
    this.getDemandesIn();
    this.isLoading = true;
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getDemandesIn() {
    this.demandesServices.getDemandesIn().subscribe(
      res => {
        this.dataSource.data = res;
        this.isLoading = false;
      }
    );
  }



  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  rowClicked(row: any): void {
    console.log(row);
  }

  deleteDemandes(demandes?: Demandes) {

  this.messageboxService.ShowMessage('Avertissement', 'Supprimer  ' + demandes.productName, '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

    this.result = res;
    console.log(res);
    if (this.result.result === 'yes') {
      this.demandesServices.deleteDemandes(demandes.id).subscribe(response => {
        if (response != null) {
          this.messageboxService.ShowMessage('Information', demandes.productName + ' Supprimer avec succès', demandes.productName, 0, false, 1, '500px', 'info', 'primary');
          this.getMesdemandesOut();
        }



      }, err => {
                  if (err != null) {
                    console.log(err);
                    this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle ' + demandes.productName + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                  }

      }

      );

    }

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
      this.getDemandesIn();
      /// this.messageboxService.ShowMessage("Information","Departements ajouter avec succès","",0,false,1,'500px',"info",'primary');
    }
  }


  );
}

FacturesView(demande: Demandes) {

  const dialogRef = this.dialog.open(FacturesComponent, {
    data: {demande: demande},
    panelClass: 'atomics-dialog-container',
    width: '950px',
   disableClose: true
  });

  dialogRef.afterClosed().subscribe(res => {
    console.log(res);
    if (res.result === 1) {
      this.getDemandesIn();
      /// this.messageboxService.ShowMessage("Information","Departements ajouter avec succès","",0,false,1,'500px',"info",'primary');
    }
  }


  );
}

}
