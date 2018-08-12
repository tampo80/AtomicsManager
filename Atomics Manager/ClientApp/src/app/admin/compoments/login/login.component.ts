import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { fadeInContent } from '@angular/material';
import { FocusDirective } from '../../directives/focus.directive';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  isLoginError = false;
  public myFocusTriggeringEventEmitter: any;

  @ViewChild('loginForm') loginForm: NgForm;
  constructor(public userService: UserService, private router: Router, public navigationService: NavigationService) {
    this.myFocusTriggeringEventEmitter = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.myFocusTriggeringEventEmitter.emit(true);
  }



  OnSubmit(userName, password) {
     this.isLoading = true;
     this.isLoginError = false;

     this.userService.userAuthentication(userName, password).subscribe((data: any) =>  {
      localStorage.setItem('userToken', data.access_token);
      this.userService.saveUserData(data);

      this.router.navigate(['/admin']);
      this.navigationService.getNavigationList();
    },
    (err: HttpErrorResponse) =>  {
      this.isLoading = false;
      this.isLoginError = true;
      this.loginForm.reset();
      this.myFocusTriggeringEventEmitter.emit(true);
    //

    });
  }

}
