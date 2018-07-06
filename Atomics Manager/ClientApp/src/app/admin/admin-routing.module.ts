import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { UsersComponent } from './compoments/users/users.component';
import { RolesComponent } from './compoments/roles/roles.component';
import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AdminComponent,
      children: [
        { path: 'manage-users', component: UsersComponent },
        { path: 'manage-roles', component: RolesComponent },
        { path: 'under-construction', component: UnderConstructionComponent },
        { path: 'dashboard',  component: MaterialDashboardComponent }
      ]
    }
  ])],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


