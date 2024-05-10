import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { NewsComponent } from './page/news/news.component';
import { TeamComponent } from './page/team/team.component';
import { LoginComponent } from './page/login/login.component';

const routes: Routes = [
  {
      path:'',
      component:HomeComponent,
      pathMatch:'full'
  },
  {
      path:'home',
      component:HomeComponent,

  },
  {
      path:'news',
      component:NewsComponent,

  },
  {
      path:'team',
      component:TeamComponent,

  },
  {
      path:'login',
      component:LoginComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
