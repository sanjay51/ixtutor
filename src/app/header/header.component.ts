import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../shared/authentication.service';

@Component({
    selector: 'my-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
    title = 'ixTutor';

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit() {

    }

    gotoLogin() {
        let link = ["/login"];
        this.router.navigate(link);
    }

    gotoSignup() {
        let link = ["/signup"];
        this.router.navigate(link);
    }

    gotoHome() {
        let link = ["/"];
        this.router.navigate(link);
    }

    logout() {
        this.authenticationService.logout();
    }

}
