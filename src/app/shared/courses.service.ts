import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Course, Meta } from '../course';
import { Utils, COURSE_ID } from './utils.service';
import { LogService } from './log.service';
import { Observable } from 'rxjs/Observable';

import { StorageService, API } from './storage.service'

@Injectable()
export class CoursesService {
	COURSES: any = {};
	COURSES_METADATA: Course[] = [];
	haskellCourse: any;
	LOG_TAG: string = "CoursesService: ";

	constructor(private storageService: StorageService, private utils: Utils, private Log: LogService,
		private authenticationService: AuthenticationService) { }

	getAllCoursesMetadata(): Observable<Course[]> {
		let courseMetadataFromCache = this.COURSES_METADATA;
		if (courseMetadataFromCache.length > 0) {
			this.Log.debug(this.LOG_TAG, "CacheHit=1,method=getAllCoursesMetadata");
			return Observable.create(function (observer) {
				observer.next(courseMetadataFromCache);
				observer.complete();
			})
		}
		this.Log.debug(this.LOG_TAG, "CacheHit=0,method=getAllCoursesMetadata");

		let observable = this.storageService.get(API.getAllCoursesMetadata, {}, this.authenticationService.getIdentityToken())
			.map(this.mapResponseAsCoursesMetadataArray);

		observable.subscribe(courses => {
			this.COURSES_METADATA = courses
		});

		return observable;
	}

	getFromCache(id: string) {
		if (this.COURSES[id]) {
			return this.COURSES[id];
		}

		return null;
	}

	putInCache(course: Course) {
		this.COURSES[course.id] = course;
	}

	getCourse(id: string): Observable<Course> {
		let courseFromCache = this.getFromCache(id);
		if (courseFromCache) {
			this.Log.debug(this.LOG_TAG, "CacheHit=1,method=getCourse,courseId=" + id);
			return Observable.create(function (observer) {
				observer.next(courseFromCache);
				observer.complete();
			});
		}

		this.Log.debug(this.LOG_TAG, "CacheHit=0,method=getCourse,courseId=" + id);

		let params = {};
		params[COURSE_ID] = id;
		let observable = this.storageService.get(API.getCourseById, params, this.authenticationService.getIdentityToken())
			.map(this.mapResponseAsCourseObject);

		observable.subscribe(course => this.putInCache(course));
		return observable;
	}

	createCourse(courseMeta: Meta, identityToken: string): Observable<any> {
		return this.storageService.createCourse(courseMeta, identityToken);
	}

	mapResponseAsCourseObject(data: any): Course {
		let metadata: any = JSON.parse(data.metadata);
		let payload: any = JSON.parse(data.payload);
		let course: Course = Course.newInstanceFromRawData(data.courseId, metadata, payload);
		return course;
	}

	mapResponseAsCoursesMetadataArray(data: any): Course[] {
		let courses: Course[] = [];
		for (let rawCourse of data) {
			let course: Course = Course.newInstanceFromRawData(rawCourse.courseId, JSON.parse(rawCourse.metadata), {});
			courses.push(course);
		}

		return courses;
	}

	saveCourseChapters(course: Course): Observable<any> {
		let chapters = JSON.stringify(course.chapters, null, 0);
		let params = { 'courseId': course.id, 'chapters': chapters }
		return this.storageService.get(API.updateCourseChapters, params, this.authenticationService.getIdentityToken())
	}

	saveCourse(course: Course): Observable<any> {
		let courseMeta = JSON.stringify(course.meta, null, 0);
		let params = { 'courseId': course.id, 'metadata': courseMeta }
		return this.storageService.get(API.updateCourseMetadata, params, this.authenticationService.getIdentityToken())
	}

	invalidateCache() {
		this.COURSES = {};
		this.COURSES_METADATA = [];
	}
}