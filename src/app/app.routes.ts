import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { AccueilAdminComponent } from './admin/accueil-admin/accueil-admin.component';
import { PublierAnnonceComponent } from './admin/publier-annonce/publier-annonce.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'accueil-admin', component: AccueilAdminComponent, canActivate: [AuthGuard] }, // Protection de la route
    { path: 'publier-annonce', component: PublierAnnonceComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' }
  ];
