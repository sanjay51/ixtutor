import { Injectable } from '@angular/core';

const AUTH_STATE: string = "AUTH_STATE";

@Injectable()
export class AuthenticationService {
    constructor() { }

    login(authenticationState: AuthenticationState) {
        let email: string = authenticationState.email;
        let password: string = authenticationState.password;

        if (((email != "sanjay.verma.nitk@gmail.com") && (password != "haryana"))
            && ((email != "thisismyidashish@gmail.com") && (password != "ashishnegi001"))
        ) {
            return;
        }

        let authState = { email: authenticationState.email, password: authenticationState.password, isLoggedIn: true };
        localStorage.setItem(AUTH_STATE, JSON.stringify(authState));
    }

    logout() {
        localStorage.removeItem(AUTH_STATE);
    }

    isLoggedIn(): boolean {
        if (this.getAuthState()) {
            return this.getAuthState().isLoggedIn;
        }

        return false;
    }

    signup(authenticationState: AuthenticationState) {
        // do real sign up
    }

    getEmail(): string {
        return this.getAuthState().email;
    }

    getAuthState(): any {
        return JSON.parse(localStorage.getItem(AUTH_STATE));
    }
}

export class AuthenticationState {
    email: string;
    password: string;
    name: string;

    constructor() {
        this.email = "";
        this.password = "";
        this.name = "";
    }

    withEmail(email: string): AuthenticationState {
        this.email = email;
        return this;
    }

    withPassword(password: string): AuthenticationState {
        this.password = password;
        return this;
    }

    withName(name: string): AuthenticationState {
        this.name = name;
        return this;
    }
}