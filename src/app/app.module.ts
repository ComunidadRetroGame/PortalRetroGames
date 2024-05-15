
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { NewsComponent } from './page/news/news.component';
import { TeamComponent } from './page/team/team.component';
import { RegisterComponent } from './page/login/register/register.component';


@NgModule({
  declarations: [

    AppComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    NewsComponent,
    TeamComponent,
    RegisterComponent
  ],
  imports: [
    
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
