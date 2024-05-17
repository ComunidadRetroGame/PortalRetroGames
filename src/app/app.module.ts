
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
import { TipsComponent } from './component/tips/tips.component';
import { SafePipe } from './safe.pipe';
import { CreateComponent } from './page/news/create/create.component';
import { QuillModule } from 'ngx-quill';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { NoticeComponent } from './page/notice/notice.component';
import { JustHostPipe } from './safe.pipe';

@NgModule({
  declarations: [
    SafePipe,
    TipsComponent,
    AppComponent,
    FooterComponent,
    JustHostPipe,
    HeaderComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    NewsComponent,
    TeamComponent,
    RegisterComponent,
    TipsComponent,
    SafePipe,
    CreateComponent,
    NoticeComponent
  ],
  imports: [
    MatTabsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        imageResize: true,
      },
    }),
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
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
