import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Fournisseurs } from '../../models/fournisseurs.model';
import { EditFournisseursDialogComponent } from './dialog/edit/edit-fournisseurs-dialog/edit-fournisseurs-dialog.component';
import { AddFournisseursDialogComponent } from './dialog/add/add-fournisseurs-dialog/add-fournisseurs-dialog.component';
import { MessageboxService } from '../../services/messagebox.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FournisseursService } from '../../services/fournisseurs.service';
import { FormeJuridique } from '../../models/forme-juridique';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss']
})
export class FournisseursComponent implements OnInit , AfterViewInit {





  private Fournisseurs: Fournisseurs[];

  formeJuridiques: FormeJuridique[] = [
    {
      value: 0, label: 'EURL'
    },
    {
      value: 1, label: 'SARL'
    },
    {
      value: 2, label: 'SELAR'
    },
    {
      value: 3, label: 'SA'
    }
    ,
    {
      value: 4, label: 'SAS'
    }
    ,
    {
      value: 3, label: 'SASU'
    },
    {
      value: 4, label: 'SNC'
    }
    ,
    {
      value: 5, label: 'SCP'
    }



  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'nomSociete', 'formeJuridique', 'email', 'phoneNumber', 'adresse', 'villesName', 'secteurs', 'actions'];
  isLoading: boolean;
  constructor(private fournisseursService: FournisseursService, private messageboxService: MessageboxService, private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.getFournisseurs();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getFournisseurs() {
    this.fournisseursService.getFournisseurs().subscribe(
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


  getformJuridique(value?: number) {
    return this.formeJuridiques.find(e => e.value === value);
  }
  rowClicked(row: any): void {
    console.log(row);
  }

  deleteFournisseurs(fournisseurs?: Fournisseurs) {

  this.messageboxService.ShowMessage('Avertissement', 'Supprimer ' + fournisseurs.titre, '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

    this.result = res;
    console.log(res);
    if (this.result.result === 'yes') {
      this.fournisseursService.deleteFournisseurs(fournisseurs.id).subscribe(response =>  {
        if (response != null) {
          this.messageboxService.ShowMessage('Information', fournisseurs.titre + ' Supprimer avec succès', fournisseurs.titre, 0, false, 1, '500px', 'info', 'primary');
          this.getFournisseurs();
        }



      }, err =>  {
                  if (err != null) {
                    console.log(err);
                    this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle ' + fournisseurs.titre + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                  }

      }

      );

    }

  });


}

  addNewFournisseurs() {

    const dialogRef = this.dialog.open(AddFournisseursDialogComponent, {
      data: {fournisseurs: ''},
     width: '70%',
     position: {
       right: '130px',

     },
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      console.log(res);
      if (res.result === 1) {
        this.getFournisseurs();
        this.messageboxService.ShowMessage('Information', 'Fournisseurs ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }
  EditFournisseurs(fournisseurs?: Fournisseurs) {

    this.fournisseursService.getFournisseursById(fournisseurs.id).subscribe(
      res =>  {
        const dialogRef = this.dialog.open(EditFournisseursDialogComponent, {
          data: {fournisseurs: res},
         width: '70%',
         position: {
          right: '150px',

        },
         disableClose: true
        });

        dialogRef.afterClosed().subscribe(response =>  {
          if (response.result === 1) {
            this.getFournisseurs();
            this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', fournisseurs.titre, 0, false, 1, '500px', 'info', 'primary');
          }
        }


        );
      }
    );


  }


}
