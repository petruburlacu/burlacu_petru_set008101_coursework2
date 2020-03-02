import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
//https://angular.io/tutorial/toh-pt6
@Injectable()
export class AuthenticationService {

  domain = "http://localhost:8080/";
  authenticationToken;
  user;
  setting;

  constructor( private http: Http ) { }

  //function to register user
  registerUser(user) { //passing the user object and sending it to the API
  //http from constructor
    return this.http.post(this.domain + 'authentication/register', user).map(res => res.json());
  }
//using predef domain of port 8080
//function for user login
  loginUser(user) {
    return this.http.post(this.domain + 'authentication/login', user).map(res => res.json());
  }

  loggedIn() {

    if(this.authenticationToken == null) {
      return false;
    }
    else {
      return true;
    }

  }

  logoutUser() {
    this.authenticationToken = null;
    this.user = null;
    localStorage.clear();
  }

  browserStoreUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));   //Storing user data in browser
    //Stringifying the user using JSON so we can store it in browser

    this.authenticationToken = token;
    this.user = user;
  }

  authenticationHeaders() { //calling this function in order to attach the headers
    //loading token
    this.authenticationToken = localStorage.getItem('token');

    this.setting = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authentication': this.authenticationToken
      })
    });
  }

  getUserDetails() {
    //pass the token in this method to take it to main authentication route and decrypt it
    //check what user is loged in to return user profile data || Using Headers to pass the tokens
    this.authenticationHeaders();//creater headers

    return this.http.get(this.domain + 'authentication/profile', this.setting).map(res => res.json());
  }//using in profile component

}
