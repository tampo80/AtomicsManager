import { Component, OnInit } from '@angular/core';
import { Articles } from '../../models/articles';
import { ArticlesService } from '../../services/articles.service';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { DetaillesDemandeComponent } from '../detailles-demande/detailles-demande.component';
import { MessageboxService } from '../../services/messagebox.service';
import { IniDemandeComponent } from '../ini-demande/ini-demande.component';

@Component({
  selector: 'app-demandes-catalogues',
  templateUrl: './demandes-catalogues.component.html',
  styleUrls: ['./demandes-catalogues.component.scss']
})
export class DemandesCataloguesComponent implements OnInit {
  lesArticles:Articles[]=[];
  lesArticlesFilter:Articles[]=[];
  constructor(private messageboxService:MessageboxService ,private articlesServices:ArticlesService,private dialog:MatDialog) {
this.getArticles();
  }

  ngOnInit() {
  }
getArticles()
{
  this.articlesServices.getArticles().subscribe(res=>{
    this.lesArticles=res;
  });

}

_filterCateGories(value: string): Articles[] {
  const filterValue = value.toLowerCase();

  return this.lesArticles.filter(option => option.name.toLowerCase().indexOf(filterValue) !== -1);
}

applyFilter(filterValue: string) {
  console.log(filterValue);

  if (filterValue=='' || filterValue==null || filterValue.length<1) {
    this.lesArticlesFilter=[];
  }
  else{
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.lesArticlesFilter=this.lesArticles.filter(option => option.name.toLowerCase().indexOf(filterValue) !== -1);
  }

}
detaillesDmande(articles:Articles)
{
  const dialogRef = this.dialog.open(DetaillesDemandeComponent,{
    data:{articles:articles},
   width:'600px',
   disableClose:true
  });

  dialogRef.afterClosed().subscribe(res=>{
    console.log(res);
    if (res.result===1) {

      this.messageboxService.ShowMessage("Information","assignation effectué avec succès",articles.name,0,false,1,'500px',"info",'primary');
    }
  }


  );
}

createDemande(product:Articles)
{
  const dialogRef = this.dialog.open(IniDemandeComponent,{
    data:{articles:product},
   width:'600px',
   disableClose:true
  });

  dialogRef.afterClosed().subscribe(res=>{
    console.log(res);
    if (res.result===1) {
      this.lesArticlesFilter=[];
      this.messageboxService.ShowMessage("Information","assignation effectué avec succès",product.name,0,false,1,'500px',"info",'primary');
    }
  }


  );
}
}
