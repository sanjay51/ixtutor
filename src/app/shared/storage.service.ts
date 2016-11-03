import { SignupState } from './../signup/signup.component';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import './rxjs-operators';
import { Observable } from 'rxjs/Observable';
import { LogService } from './log.service';

@Injectable()
export class StorageService {
    URL: string = "https://gztyqbl4h1.execute-api.us-east-1.amazonaws.com/prod";
    LOG_TAG: string = "StorageService: ";
    constructor(private http: Http, private Log: LogService) { }

    getString(key: string): Promise<string> {
        this.Log.debug(this.LOG_TAG, "localStorageHit=1");
        return Promise.resolve(localStorage.getItem(key));
    }

    setString(key: string, value: string): Promise<any> {
        return Promise.resolve(localStorage.setItem(key, value));
    }

    get(request: API, params: any): Observable<any> {
        switch (request) {
            case API.getCourseById:
                return this.getCourseById(params.courseId);
            case API.getAllCoursesMetadata:
                return this.getAllCoursesMetadata();
            case API.updateCourseMetadata:
                return this.updateCourseMetadata(params.courseId, params.metadata);
            case API.updateCourseChapters:
                return this.updateCourseChapters(params.courseId, params.chapters);
        }
    }

    private getCourseById(courseId: string): Observable<any> {
        this.Log.debug(this.LOG_TAG, "remoteCall=1,api=getCourseById,courseId=" + courseId);
        let url: string = this.URL + '/getCourse' + '?courseId=' + courseId + '&operation=getCourseById';
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getUserByEmail(email: string): Observable<any> {
        this.Log.debug(this.LOG_TAG, "remoteCall=1,api=getUserByEmail,email=" + email);
        let url: string = this.URL + '/user' + '?userEmail=' + email + '&operation=getUserByEmail';
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public login(email: string, password: string): Observable<any> {
        this.Log.debug(this.LOG_TAG, "remoteCall=1,api=login,email=" + email);
        let url: string = this.URL + '/user' + '?email=' + email + '&password=' + password + '&operation=login';
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private getAllCoursesMetadata(): Observable<any> {
        let url: string = this.URL + '/getCourse' + '?operation=getAllCoursesMetadata';
        return this.http.get(url)
            .map(this.extractAllData)
            .catch(this.handleError);
    }

    public signupUser(signupState: SignupState): Observable<any> {
        let url: string = this.URL + '/user' + '?operation=signup' +
                '&email=' + signupState.email + '&password=' + signupState.password +
                '&name=' + encodeURIComponent(signupState.name);
        this.Log.debug(this.LOG_TAG, "signupURL=" + url);
        return this.http.get(url);
    }

    private updateCourseMetadata(courseId: string, metadata: string): Observable<any> {
        let url: string = this.URL + '/getCourse' + '?operation=updateCourseMetadata' +
                '&courseId=' + courseId + '&metadata=' + encodeURIComponent(metadata);
        console.log(url);

        this.http.get(url).subscribe(x => console.log(x));
        return Observable.create();
    }

    private updateCourseChapters(courseId: string, chapters: string): Observable<any> {
        let url: string = this.URL + '/getCourse' + '?operation=updateCourseChapters' +
                '&courseId=' + courseId + '&chapters=' + encodeURIComponent(chapters);
        console.log(url);

        this.http.get(url).subscribe(x => console.log(x));
        return Observable.create();
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.Item || {};
    }

    private extractAllData(res: Response) {
        return res.json().Items || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return errMsg;
    }
}

export enum API {
    //read
    getCourseById,
    getAllCoursesMetadata,

    // write
    updateCourseMetadata,
    updateCourseChapters
}