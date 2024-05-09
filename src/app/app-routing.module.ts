import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { NewsComponent } from './page/news/news.component';
import { TeamComponent } from './page/team/team.component';
import { LoginComponent } from './page/login/login.component';

export const routes: Routes = [
  {
      path:'',
      component:HomeComponent,
      pathMatch:'full'
  },
  {
      path:'home',
      component:HomeComponent,
      pathMatch:'full'
  },
  {
      path:'news',
      component:NewsComponent,
      pathMatch:'full'
  },
  {
      path:'team',
      component:TeamComponent,
      pathMatch:'full'
  },
  {
      path:'login',
      component:LoginComponent,
      pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
