import { Component, OnInit } from '@angular/core';
import { Articles } from '../../models/articles';
import { ArticlesService } from '../../services/articles.service';
import { MatDialog } from '@angular/material';

import { MessageboxService } from '../../services/messagebox.service';
import { IniDemandeComponent } from '../ini-demande/ini-demande.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { ApprobationLevel } from '../../models/approbation-level';

@Component({
  selector: 'app-demandes-catalogues',
  templateUrl: './demandes-catalogues.component.html',
  styleUrls: ['./demandes-catalogues.component.scss']
})
export class DemandesCataloguesComponent implements OnInit {
  lesArticles: Articles[] = [];
  lesArticlesFilter: Articles[] = [];

  constructor(private router: Router, private domSanitize: DomSanitizer, private messageboxService: MessageboxService , private articlesServices: ArticlesService, private dialog: MatDialog) {
this.getArticles();
  }

  ngOnInit() {
  }
getArticles() {
  this.articlesServices.getArticles().subscribe(res =>  {
    this.lesArticles = res;
  });

}
mkeTrustedImage(item) {
  const imageString = item.replace(/\\n/g, '');
  const style = 'url(' + imageString + ')';
  return this.domSanitize.bypassSecurityTrustStyle(style);
}

_filterCateGories(value: string): Articles[] {
  const filterValue = value.toLowerCase();

  return this.lesArticles.filter(option => option.name.toLowerCase().indexOf(filterValue) !== -1);
}

applyFilter(filterValue: string) {
  console.log(filterValue);

  if (filterValue === '' || filterValue == null || filterValue.length < 1) {
    this.lesArticlesFilter = [];
  } else {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.lesArticlesFilter = this.lesArticles.filter(option => option.name.toLowerCase().indexOf(filterValue) !== -1);
  }

}






createDemande(product: Articles) {
  const dialogRef = this.dialog.open(IniDemandeComponent, {
    data: {articles: product},
   width: '700px',
   disableClose: true
  });

  dialogRef.afterClosed().subscribe(res => {
    console.log(res);
    if (res.result === 1) {
      this.lesArticlesFilter = [];
      this.messageboxService.ShowMessage('Information', 'assignation effectué avec succès', product.name, 0, false, 1, '500px', 'info', 'primary');
      this.router.navigate(['/admin/manage-mesdemandes']);
    }
  }


  );
}
}
