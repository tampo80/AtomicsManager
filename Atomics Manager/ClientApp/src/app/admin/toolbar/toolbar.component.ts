import { Component, OnInit, Input } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { NavigationService } from '../services/navigation.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() sidenav: MatDrawer;

  constructor(
    public navigationService: NavigationService,public userService:UserService
  ) { 

    console.log(userService.currentUser.friendlyName);
  }

  ngOnInit() {
  }

}
