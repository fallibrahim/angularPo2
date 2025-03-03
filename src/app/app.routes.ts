import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AccueilAdminComponent } from './admin/accueil-admin/accueil-admin.component';
import { PublierAnnonceComponent } from './admin/publier-annonce/publier-annonce.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AnnonceComponent } from './admin/annonce/annonce.component';
import { AnneeComponent } from './admin/annee/annee.component';
import { CandidatsComponent } from './admin/candidats/candidats.component';
import { ReglagesComponent } from './admin/reglages/reglages.component';
import { AddAnneeComponent } from './admin/add-annee/add-annee.component';
import { EditAnnonceComponent } from './admin/edit-annonce/edit-annonce.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'accueil-admin', component: AccueilAdminComponent, canActivate: [AuthGuard] }, // Protection de la route
    {path:'candidats', component : CandidatsComponent, canActivate: [AuthGuard]},
    { path: 'annonce/:id', component: AnnonceComponent , canActivate: [AuthGuard]}, // Protection de la route
    { path: 'publier-annonce', component: PublierAnnonceComponent, canActivate: [AuthGuard] },
    { path: 'edit-annonce/:id', component:EditAnnonceComponent, canActivate: [AuthGuard] },
    { path: 'annee-academique', component: AnneeComponent , canActivate: [AuthGuard]},
    { path: 'add-annee', component: AddAnneeComponent, canActivate: [AuthGuard]},
    { path: 'reglages', component: ReglagesComponent , canActivate: [AuthGuard]},
    // { path: '**', redirectTo: 'login' }
  ];
