import { Routes } from '@angular/router';
import { introGuard } from './guards/intro.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard, introGuard] // Primero valida si está logueado y si vio la intro
  },
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then((m) => m.IntroPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage)
  },
  {
    path: '',
    redirectTo: 'login', // 🚨 Importante: iniciar desde login
    pathMatch: 'full'
  }
];

