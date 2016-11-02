import { SignupState } from './../signup/signup.component';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const AUTH_STATE: string = "AUTH_STATE";

@Injectable()
export class AuthenticationService {
    constructor(private storageService: StorageService) { }

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

    signup(signupState: SignupState): Observable<any> {
        return this.storageService.signupUser(signupState);
    }

    getEmail(): string {
        return this.getAuthState().email;
    }

    getAuthState(): any {
        return JSON.parse(localStorage.getItem(AUTH_STATE));
    }

    getUserProfile(email: string): Observable<User> {
        // TODO: Don't fetch password
		let observable = this.storageService.getUserByEmail(email)
			.map(this.mapResponseAsUserObject);

		return observable;
    }

	mapResponseAsUserObject(rawUser: any): User {
		let user: User = User.newInstanceFromRawData(rawUser.id, rawUser.email, JSON.parse(rawUser.data));
		return user;
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

export class User {
    id: string;
    email: string;
    password: string;
    userData: UserData;
    constructor(id: string, email: string) {
        this.id = id;
        this.email = email;
    }

    static newInstanceFromRawData(id: string, email: string, rawUserData: any) : User {
        return new User(id, email)
                    .withPassword(rawUserData.password)
                    .withUserData(new UserData(rawUserData));
    }

    withPassword(password: string): User {
        this.password = password;
        return this;
    }

    withUserData(userData: UserData): User {
        this.userData = userData;
        return this;
    }
}

export class UserData {
    name: string;
    status: string;
    creation_timestamp: string;
    courses_authored: string[] = [];
    courses_enrolled: UserCourseEnrollment[] = [];

    constructor(rawUserData: any) {
        this.name = rawUserData.name;
        this.status = rawUserData.status
        this.creation_timestamp = rawUserData.creation_timestamp;

        for (let courseId of rawUserData.courses_authored) {
            this.courses_authored.push(courseId);
        }

        for (let rawUserCourseEnrollment of rawUserData.courses_enrolled) {
            this.courses_enrolled.push(new UserCourseEnrollment(rawUserCourseEnrollment))
        }
    }
}

export class UserCourseEnrollment {
    courseId: string;
    enrollment_timestamp: string;
    completion_timestamp: string;
    progress: UserCourseProgress;

    constructor(rawUserCourseEnrollment: any) {
        this.courseId = rawUserCourseEnrollment.courseId;
        this.enrollment_timestamp = rawUserCourseEnrollment.enrollment_timestamp;
        this.completion_timestamp = rawUserCourseEnrollment.completion_timestamp;
        this.progress = new UserCourseProgress(rawUserCourseEnrollment.progress);
    }
}

export class UserCourseProgress {
    state: string;
    chapterId: string;
    sectionId: string;

    constructor(rawUserCourseProgress: any) {
        this.state = rawUserCourseProgress.state;
        this.chapterId = rawUserCourseProgress.chapterId;
        this.sectionId = rawUserCourseProgress.sectionId;
    }
}