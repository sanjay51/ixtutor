import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, AuthenticationState } from './../shared/authentication.service';

@Component({
    selector: '<my-login>',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    authenticationState: AuthenticationState;

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.authenticationState = new AuthenticationState();
    }

    ngOnInit() { }

    tryLogin() {
        this.authenticationService.login(this.authenticationState);

        if (this.authenticationService.isLoggedIn()) {
            let link = ['/dashboard'];
            this.router.navigate(link);
        } else {
            this.authenticationState = new AuthenticationState();
        }
    }
}