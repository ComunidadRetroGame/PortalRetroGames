import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { NewsComponent } from './page/news/news.component';
import { TeamComponent } from './page/team/team.component';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { RegisterComponent } from './page/login/register/register.component';
import { CreateComponent } from './page/news/create/create.component'; 
import { NoticeComponent } from './page/notice/notice.component';
import { MobileHomeComponent } from './mobile/home/home.component';
const routes: Routes = [
    {
        path: 'mobile',
        component: MobileHomeComponent,

    },
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,

    },
    {
        path: 'news',
        component: NewsComponent,

    },
    {
        path: 'create',
        component: CreateComponent,

    },
    {
        path: 'notice',
        component: NoticeComponent,

    },
    {
        path: 'team',
        component: TeamComponent,

    },
    {
        path: 'login',
        component: LoginComponent,

    },
    {
        path: 'dashboard',
        component: DashboardComponent,

    },
    {
        path: 'newPlayer',
        component: RegisterComponent,

    },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
