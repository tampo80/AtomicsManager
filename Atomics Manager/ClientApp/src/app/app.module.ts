import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompomentsModule } from './admin/compoments/compoments.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityModule } from './security/security.module';

import { FormsModule } from '@angular/forms';
import { AuthGuard } from './admin/auth/auth.guard';
import { UserService } from './admin/services/user.service';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './admin/auth/auth.interceptor';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SecurityModule,
    CompomentsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,


  ],
  providers: [AuthGuard, UserService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.debug(this.constructor.name);
  }
}
