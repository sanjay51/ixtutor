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

    constructor() {
        this.email = "";
        this.password = "";
    }
}