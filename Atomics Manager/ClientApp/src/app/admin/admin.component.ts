import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public themeService: ThemeService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
  ) {

    iconRegistry.addSvgIcon(
      'account-star',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/account-star.svg'));
      iconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {
  }

}
