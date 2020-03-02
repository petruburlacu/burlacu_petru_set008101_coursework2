import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//https://angular.io/guide/reactive-forms#import-the-reactiveformsmodule
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
//Generating components automatic using Angular ng generate component method
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './restrict/valid.restrict';
import { NotAuthGuard } from './restrict/notvalid.restrict';
import { BlogComponent } from './components/blog/blog.component';
import { BlogService } from './services/blog.service';
import { UpdateComponent } from './components/blog/update/update.component';
import { DeleteComponent } from './components/blog/delete/delete.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    UpdateComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthenticationService, AuthGuard, NotAuthGuard, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
