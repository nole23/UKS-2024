import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Dodajte ovo!
import { FormsModule } from '@angular/forms'; // Dodajte ovo
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Dodaj ovo

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  // Importuj AppRoutingModule
import { HeaderComponent } from './common/header/header.component';
import { DiferredSidePanelComponent } from './common/header/diferred-side-panel/diferred-side-panel.component';
import { NotificationIndicatorComponent } from './common/header/notification-indicator/notification-indicator.component';
import { IssuesComponent } from './common/issues/issues.component';
import { NotificationsComponent } from './common/notifications/notifications.component';
import { PullsComponent } from './common/pulls/pulls.component';
import { ErrorComponent } from './common/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DiferredSidePanelComponent,
    NotificationIndicatorComponent,
    IssuesComponent,
    NotificationsComponent,
    PullsComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot([]), // Dodajte ovo za osnovnu rutu ili obavezno postavite rute
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
