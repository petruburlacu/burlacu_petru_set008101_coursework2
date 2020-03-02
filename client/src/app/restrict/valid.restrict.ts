// MAKES SURE THAT USERS ARE LOGGED IN!
//https://angular.io/guide/router#component-less-route-grouping-routes-without-a-component v2

import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthenticationService }      from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    console.log('GUARD called');

    if(this.authenticationService.loggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}
