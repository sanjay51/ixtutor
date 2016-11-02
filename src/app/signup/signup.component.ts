import { LogService } from './../shared/log.service';
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
    LOG_TAG = "SignupComponent: ";

    /*
    Only show errors once the user has tried sign up once.
    */
    isSignupAttempted = false;

    constructor(private authenticationService: AuthenticationService,
        private validator: ValidatorService,
        private router: Router,
        private Log: LogService) {
        this.signupState = new SignupState();
    }

    ngOnInit() { }

    trySignUp() {
        if (!this.isFormOK()) {
            this.isSignupAttempted = true;
            return;
        }

        let signupPromise = this.authenticationService.signup(this.signupState).toPromise();

        signupPromise.then(x => {
            this.isSignupComplete = true;
        }).catch(error => {
            this.Log.error(this.LOG_TAG, error);
            alert("Sign up failed. Please check your internet connection or try again.");
        })

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