import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '../../../../../node_modules/@angular/material';
import { Articles } from '../../models/articles';
import { MessageboxService } from '../../services/messagebox.service';
import { AddArticlesDialogComponent } from './add/add-articles-dialog/add-articles-dialog.component';
import { EditArticlesDialogComponent } from './edit/edit-articles-dialog/edit-articles-dialog.component';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit  , AfterViewInit {

    private Articles:Articles[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public result: any;
    dataSource = new MatTableDataSource();
    displayedColumns = ['id','name','ProductCategoryName','description','buyingPrice','actions'];
    isLoading:boolean;

    constructor(private articlesService:ArticlesService,private messageboxService:MessageboxService,private dialog: MatDialog) {
      this.isLoading=true;
     }

    ngOnInit() {
      this.getArticles();
      this.isLoading=true;
    }

    ngAfterViewInit() {

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

     getArticles() {
      this.articlesService.getArticles().subscribe(
        res=>{
          this.dataSource.data=res;
          this.isLoading=false;
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

    deleteArticles(articles?:Articles){

    this.messageboxService.ShowMessage("Avertissement","Supprimer  "+articles.name,"",2,false,1,'520px',"warning",'warn').subscribe(res => {

      this.result = res
      console.log(res);
      if (this.result.result=="yes") {
        this.articlesService.deleteArticles(articles.id).subscribe(res=>{
          if (res!=null) {
            this.messageboxService.ShowMessage("Information",articles.name+" Supprimer avec succès",articles.name,0,false,1,'500px',"info",'primary');
            this.getArticles();
          }



        },err=>{
                    if (err!=null) {
                      console.log(err);
                      this.messageboxService.ShowMessage("Information","Impossible de supprimer le rôle "+articles.name+" car il est assigné à des utilisateurs ",'',0,false,1,'500px',"info",'primary');
                    }

        }

        );

      }

    });


  }

    addNewArticles(){

      const dialogRef = this.dialog.open(AddArticlesDialogComponent,{
        data:{articles:""},
       width:'600px',
       disableClose:true
      });

      dialogRef.afterClosed().subscribe(res=>{
        console.log(res);
        if (res.result===1) {
          this.getArticles();
          this.messageboxService.ShowMessage("Information","Articles ajouter avec succès","",0,false,1,'500px',"info",'primary');
        }
      }


      );
    }
    EditArticles(articles?:Articles){

       console.log(articles);
      const dialogRef = this.dialog.open(EditArticlesDialogComponent,{
        data:{articles:articles},
       width:'600px',
       disableClose:true
      });

      dialogRef.afterClosed().subscribe(res=>{
        if (res.result===1) {
          this.getArticles();
          this.messageboxService.ShowMessage("Information"," modification éffectuée avec succès",articles.name,0,false,1,'500px',"info",'primary');
        }
      }


      );
    }


  }
