import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { SiderBarLeftComponent } from './common/sider-bar-left/sider-bar-left.component';
import { AsideComponent } from './common/aside/aside.component';
import { ArticleComponent } from './common/aside/article/article.component';
import { LoadingContextComponent } from './common/sider-bar-left/loading-context/loading-context.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    SiderBarLeftComponent,
    AsideComponent,
    ArticleComponent,
    LoadingContextComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
