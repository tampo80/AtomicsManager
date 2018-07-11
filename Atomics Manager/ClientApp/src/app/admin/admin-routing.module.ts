import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { UsersComponent } from './compoments/users/users.component';
import { RolesComponent } from './compoments/roles/roles.component';
import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';
import { PaysComponent } from './compoments/pays/pays.component';
import { VillesComponent } from './compoments/villes/villes.component';
import { DevisesComponent } from './compoments/devises/devises.component';
import { SecteursComponent } from './compoments/secteurs/secteurs.component';
import { FournisseursComponent } from './compoments/fournisseurs/fournisseurs.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AdminComponent,
      children: [
        { path: 'manage-users', component: UsersComponent },
        { path: 'manage-villes', component: VillesComponent },
        { path: 'manage-pays', component: PaysComponent },
        { path: 'manage-secteurs', component: SecteursComponent },
        { path: 'manage-devises', component: DevisesComponent },
        { path: 'manage-fournisseurs', component: FournisseursComponent },
        { path: 'manage-roles', component: RolesComponent },
        { path: 'under-construction', component: UnderConstructionComponent },
        { path: 'dashboard',  component: MaterialDashboardComponent }
      ]
    }
  ])],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


