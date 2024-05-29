
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { NoticeComponent } from './page/notice/notice.component';
import { JustHostPipe, formatMiles } from './safe.pipe';
import { MobileHomeComponent } from './mobile/home/home.component';
import { ListComponent } from './page/news/list/list.component';
import { PerfilComponent } from './page/team/perfil/perfil.component';
import { environment } from '../environments/environment';
import { QuillModule } from 'ngx-quill';

import ImageCompress from 'quill-image-compress';
//import { ImageResize } from 'quill-image-resize-module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';



import Quill from 'quill';
import { StreamComponent } from './page/news/stream/stream.component';
import { CalendarComponent } from './page/news/events/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MobilListComponent } from './mobile/news/mobil-list/mobil-list.component';
import { MobilTipsComponent } from './mobile/news/mobil-tips/mobil-tips.component';




//Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageCompress', ImageCompress);

@NgModule({
  declarations: [    
    SafePipe,
    TipsComponent,
    MobileHomeComponent,
    AppComponent,
    FooterComponent,
    JustHostPipe,
    formatMiles,
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
    NoticeComponent,
    ListComponent,
    PerfilComponent,
    StreamComponent,
    CalendarComponent,
    MobilListComponent,
    MobilTipsComponent
  ],
  imports: [
    
    AngularFireModule.initializeApp(environment.firebase),
    FullCalendarModule,
    AngularFireMessagingModule,
    MatTabsModule,
    QuillModule.forRoot({
      modules: {
        imageCompress: {
          quality: 0.7, // default
          maxWidth: 1000, // default
          maxHeight: 1000, // default
          imageType: 'image/jpeg', // default
          debug: true, // default
          suppressErrorLogging: false, // default
          insertIntoEditor: undefined, // default
        },
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
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
