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
import { ProfileComponent } from './me/profile/profile.component';
import { EntrepriseComponent } from './compoments/entreprise/entreprise.component';
import { AgencesComponent } from './compoments/agences/agences.component';
import { Departements } from './models/departements';
import { DepartementsComponent } from './compoments/departements/departements.component';
import { ServicesComponent } from './compoments/services/services.component';
import { ArticlesComponent } from './compoments/articles/articles.component';
import { CategoriesComponent } from './compoments/categories/categories.component';
import { APGembersComponent } from './compoments/a-pgembers/a-pgembers.component';
import { ProfilComponent } from './compoments/profil/profil.component';
import { ApprobationLevelComponent } from './compoments/approbation-level/approbation-level.component';
import { DemandesCataloguesComponent } from './demandes/demandes-catalogues/demandes-catalogues.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AdminComponent,
      children: [
        {path:'manage-approuval-level',component:ApprobationLevelComponent},
        { path: 'manage-profil', component: ProfilComponent },
        {path:'manage-demande-catalogues',component:DemandesCataloguesComponent},
        { path: 'manage-approuval-group', component: APGembersComponent },
        { path: 'manage-categories', component: CategoriesComponent },
        { path: 'manage-catalogues', component: ArticlesComponent },
        { path: 'manage-agences', component: AgencesComponent },
        { path: 'manage-departements', component: DepartementsComponent },
        { path: 'manage-services', component: ServicesComponent },
        { path: 'manage-entreprise', component: EntrepriseComponent },
        { path: 'manage-me', component: ProfileComponent },
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


