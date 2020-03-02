// MAKES SURE THAT USERS ARE NOT LOGGED IN!
//https://angular.io/guide/router#component-less-route-grouping-routes-without-a-component v2

import { Injectable }       from '@angular/core';
import {
  CanActivate, Router
}                           from '@angular/router';
import { AuthenticationService }      from '../services/authentication.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    console.log('NOT GUARD called');

    if(this.authenticationService.loggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    else {
      return true;
    }

  }
}
