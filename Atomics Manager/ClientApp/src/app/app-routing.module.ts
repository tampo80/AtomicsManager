import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CallbackComponent } from './security/callback/callback.component';
import { AuthGuard } from './admin/auth/auth.guard';
import { LoginComponent } from './admin/compoments/login/login.component';


@NgModule({
  imports: [RouterModule.forRoot([

    { path: 'callback', component: CallbackComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/admin', pathMatch: 'full' },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard] },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.debug(this.constructor.name);
  }
}


