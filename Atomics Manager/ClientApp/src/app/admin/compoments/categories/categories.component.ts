import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Categories } from '../../models/categories';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { MessageboxService } from '../../services/messagebox.service';
import { AddCategoriesDialogComponent } from './dialog/add/add-categories-dialog/add-categories-dialog.component';
import { EditCategoriesDialogComponent } from './dialog/edit/edit-categories-dialog/edit-categories-dialog.component';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit , AfterViewInit {

  private Categories: Categories[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public result: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'name', 'description', 'actions'];
  isLoading: boolean;
  constructor(private categoriesService: CategoriesService, private messageboxService: MessageboxService, private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.getCategories();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   getCategories() {
    this.categoriesService.getCategories().subscribe(
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

  deleteCategories(categories?: Categories) {

  this.messageboxService.ShowMessage('Avertissement', 'Supprimer ' + categories.name, '', 2, false, 1, '520px', 'warning', 'warn').subscribe(res => {

    this.result = res;
    console.log(res);
    if (this.result.result === 'yes') {
      this.categoriesService.deleteCategories(categories.id).subscribe(response =>  {
        if (response != null) {
          this.messageboxService.ShowMessage('Information', categories.name + ' Supprimer avec succès', categories.name, 0, false, 1, '500px', 'info', 'primary');
          this.getCategories();
        }



      }, err =>  {
                  if (err != null) {
                    console.log(err);
                    this.messageboxService.ShowMessage('Information', 'Impossible de supprimer le rôle ' + categories.name + ' car il est assigné à des utilisateurs ', '', 0, false, 1, '500px', 'info', 'primary');
                  }

      }

      );

    }

  });


}

  addNewCategories() {

    const dialogRef = this.dialog.open(AddCategoriesDialogComponent, {
      data: {categories: ''},
     width: '600px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      console.log(res);
      if (res.result === 1) {
        this.getCategories();
        this.messageboxService.ShowMessage('Information', 'Categories ajouter avec succès', '', 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }
  EditCategories(categories?: Categories) {

    const dialogRef = this.dialog.open(EditCategoriesDialogComponent, {
      data: {categories: categories},
     width: '600px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe(res =>  {
      if (res.result === 1) {
        this.getCategories();
        this.messageboxService.ShowMessage('Information', ' modification éffectuée avec succès', categories.name, 0, false, 1, '500px', 'info', 'primary');
      }
    }


    );
  }


}
