import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from './../shared/authentication.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    canActivate() {
        if (this.authenticationService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
            return false;
        }

        return true;
    }
}