//https://angular.io/guide/router
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './restrict/valid.restrict'; //similar to a service, have to add to app module
import { NotAuthGuard } from './restrict/notvalid.restrict'; //similar to a service, have to add to app module
import { UpdateComponent } from './components/blog/update/update.component';
import { DeleteComponent } from './components/blog/delete/delete.component';

//building a route
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent //default route
  },
  {
    path: 'register', //path to register http://localhost:8080/register
    component: RegisterComponent, //register route
    canActivate: [NotAuthGuard] //using the AuthGuard to limit the access
  },
  {
    path: 'login', //path to login http://localhost:8080/login
    component: LoginComponent, //login route
    canActivate: [NotAuthGuard] //using the AuthGuard to limit the access
  },
  {
    path: 'profile', //path to profile http://localhost:8080/profile
    component: ProfileComponent, //profile route
    canActivate: [AuthGuard] //using the AuthGuard to limit the access
    //https://angular.io/guide/router#component-less-route-grouping-routes-without-a-component
  },
  {
    path: 'blog', //path to blog http://localhost:8080/blog
    component: BlogComponent, //blog route
    canActivate: [AuthGuard] //using the AuthGuard to limit the access
    //https://angular.io/guide/router#component-less-route-grouping-routes-without-a-component
  },
  {
    path: 'update/:id', //path to blog http://localhost:8080/blog
    component: UpdateComponent, //blog route
    canActivate: [AuthGuard] //using the AuthGuard to limit the access -- for loged in users
  },
  {
    path: 'delete/:id', //path to blog http://localhost:8080/blog
    component: DeleteComponent, //blog route
    canActivate: [AuthGuard] //using the AuthGuard to limit the access -- for loged in users
  },
  {
    path: '**', component: HomeComponent
  } //any other, unsepcified, path is going to redirect user to home
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
    // other imports here
  ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
