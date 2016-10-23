import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, AuthenticationState } from './../shared/authentication.service';
import { ValidatorService } from './../shared/validator.service';

@Component({
    selector: '<my-signup>',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signupState: SignupState;
    errors: string[] = [];
    isSignupComplete: boolean = false;

    /*
    Only show errors once the user has tried sign up once.
    */
    isSignupAttempted = false;

    constructor(private authenticationService: AuthenticationService,
        private validator: ValidatorService,
        private router: Router) {
        this.signupState = new SignupState();
    }

    ngOnInit() { }

    trySignUp() {
        if (!this.isFormOK()) {
            this.isSignupAttempted = true;
            return;
        }

        let authenticationState: AuthenticationState = new AuthenticationState()
            .withName(this.signupState.name)
            .withEmail(this.signupState.email)
            .withPassword(this.signupState.password);

        this.authenticationService.signup(authenticationState);
        this.isSignupComplete = true;

        if (this.authenticationService.isLoggedIn()) {
            let link = ['/dashboard'];
            this.router.navigate(link);
        } else {
            //this.authenticationState = new AuthenticationState();
        }
    }

    isFormOK(): boolean {
        this.errors = [];

        // name
        let nameValidation = this.validator.isValidName(this.signupState.name);
        (!nameValidation.isValid) ? this.errors.push(nameValidation.message) : "";

        // email
        let emailValidation = this.validator.isValidEmail(this.signupState.email);
        (!emailValidation.isValid) ? this.errors.push(emailValidation.message) : "";

        // password
        let passwordValidation = this.validator.isValidPassword(this.signupState.password);
        (!passwordValidation.isValid) ? this.errors.push(passwordValidation.message) : "";

        // confirm password
        let confirmPasswordValidation = this.validator.isValidConfirmPassword(this.signupState.password, this.signupState.confirmPassword);
        (!confirmPasswordValidation.isValid) ? this.errors.push(confirmPasswordValidation.message) : "";

        return this.errors.length == 0;
    }

    revalidateForm() {
        if (this.isSignupAttempted) {
            this.isFormOK();
        }
    }
}

export class SignupState {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;

    constructor() {
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
        this.name = "";
    }
}