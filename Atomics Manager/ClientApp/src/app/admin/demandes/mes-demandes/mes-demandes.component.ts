import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { MessageboxService } from '../../services/messagebox.service';
import { DemandeService } from '../../services/demande.service';
import { Demandes } from '../../models/demandes';
import { STATUT } from '../../config';
import { DetailOwndemandesComponent } from './detail-owndemandes/detail-owndemandes.component';

@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.scss']
})
export class MesDemandesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'productName', 'userFullName', 'montant', 'statut', 'dateDemande', 'actions'];
  isLoading: boolean;
  statut = STATUT;
  constructor(private demandesServices: DemandeService, private messageboxService: MessageboxService, private dialog: MatDialog) {
    this.isLoading = true;
   }

   getStatut(value) {
     return STATUT.find(e => e.value === value);
   }

   getMesdemandesOut() {
      this.demandesServices.getDemandesOut().subscribe(res =>  {
        // this.mesdemandesOut=res;
        this.dataSource.data = res;
        this.isLoading = false;
      });
    }

  ngOnInit() {
    this.getMesdemandesOut();
    this.isLoading = true;
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getDemandesIn() {
    this.demandesServices.getDemandesIn().subscribe(
      res =>  {
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
      this.demandesServices.deleteDemandes(demandes.id).subscribe(res =>  {
        if (res != null) {
          this.messageboxService.ShowMessage('Information', demandes.productName + ' Supprimer avec succès', demandes.productName, 0, false, 1, '500px', 'info', 'primary');
          this.getMesdemandesOut();
        }



      }, err =>  {
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

  const dialogRef = this.dialog.open(DetailOwndemandesComponent, {
    data: {demande: demande},
   width: '850px',
   disableClose: true
  });

  dialogRef.afterClosed().subscribe(res =>  {
    console.log(res);
    if (res.result === 1) {
      this.getMesdemandesOut();
      /// this.messageboxService.ShowMessage("Information","Departements ajouter avec succès","",0,false,1,'500px',"info",'primary');
    }
  }


  );
}

}
