import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './user-profile-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { UserProfileComponent } from './user-profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    OverviewComponent,
    ProjectsComponent,
    RepositoriesComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class UserProfiledModule { }
