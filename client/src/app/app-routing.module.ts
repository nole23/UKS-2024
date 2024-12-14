import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, UnauthenticatedGuard } from './auth.guard';
import { IssuesComponent } from './common/issues/issues.component';
import { PullsComponent } from './common/pulls/pulls.component';
import { NotificationsComponent } from './common/notifications/notifications.component';
import { ErrorComponent } from './common/error/error.component';

const routes: Routes = [
  // Lazy loading za Auth module
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [UnauthenticatedGuard] },

  // Lazy loading za Dashboard module
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },

  // Lazy loading za Dashboard module
  { path: 'u/:username', loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfiledModule), canActivate: [AuthGuard] },

  { path: 'issues', component: IssuesComponent, canActivate: [AuthGuard] },

  { path: 'pulls', component: PullsComponent, canActivate: [AuthGuard] },

  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },

  { path: 'error', component: ErrorComponent },

  // Preusmeravanje na login ako ruta nije pronađena
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
