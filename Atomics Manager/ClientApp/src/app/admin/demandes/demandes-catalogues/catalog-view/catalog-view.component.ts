import { Component, OnInit } from '@angular/core';
import { Articles } from '../../../models/articles';
import { ArticlesService } from '../../../services/articles.service';

@Component({
  selector: 'app-catalog-view',
  templateUrl: './catalog-view.component.html',
  styleUrls: ['./catalog-view.component.scss']
})
export class CatalogViewComponent implements OnInit {

  //lesArticles:Articles[]=[];

  constructor(private articlesServices:ArticlesService) {

  }

  ngOnInit() {
  }

}
