import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Lazy loading za Auth module
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  // Lazy loading za Dashboard module
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },

  // Preusmeravanje na login ako ruta nije pronađena
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }