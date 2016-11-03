import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoursesService } from './shared/courses.service';
import { AuthenticationService } from './shared/authentication.service';

import { Course } from './course';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    courses: Course[] = [];

    constructor(private router: Router, private coursesService: CoursesService
        , private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.coursesService.getAllCoursesMetadata()
            .subscribe(courses => {
                this.courses = courses
            });
    }

    loadCourse(course: Course) {
        let link = ['/course', course.id];
        this.router.navigate(link);
    }

    editCourse(course: Course) {
        let link = ['/editor', 'course', course.id];
        this.router.navigate(link);
    }

    isCourseEditor(course: Course) {
        return this.authenticationService.isCourseEditor(course);
    }
}