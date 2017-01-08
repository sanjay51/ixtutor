import { AuthenticationService } from './../shared/authentication.service';
import { CoursesService } from './../shared/courses.service';
import { LogService } from './../shared/log.service';
import { Router } from '@angular/router';
import { ValidatorService } from './../shared/validator.service';
import { Meta } from './../course';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {
  courseMeta: Meta = Meta.newInstance();
  errors: string[] = [];
  isCourseCreationComplete: boolean = false;
  LOG_TAG = "NewCourseComponent: ";

  /*
  Only show errors once the user has tried sign up once.
  */
  isCourseCreationAttempted = false;

  constructor(private validator: ValidatorService,
    private authenticationService: AuthenticationService,
    private coursesService: CoursesService,
    private router: Router,
    private Log: LogService) { }

  ngOnInit() {
    this.courseMeta.author = this.authenticationService.getUserId();
  }

  tryCourseCreation() {
    if (!this.isFormOK()) {
      this.isCourseCreationAttempted = true;
      return;
    }

    let createCoursePromise = this.coursesService.createCourse(this.courseMeta, this.authenticationService.getIdentityToken()).toPromise();

    createCoursePromise.then(response => {
      console.log(response);
      this.isCourseCreationComplete = true;
      this.gotoCourseEditor(response.json().courseId);
    }).catch(error => {
      this.Log.error(this.LOG_TAG, error);
      alert("New course creation failed. Please check your internet connection or try again.");
    })
  }

  gotoCourseEditor(courseId: string) {
    this.router.navigate(['/editor', 'course', courseId]);
  }

  isFormOK(): boolean {
    this.errors = [];

    // title
    let titleValidation = this.validator.isValidTitle(this.courseMeta.title);
    (!titleValidation.isValid) ? this.errors.push(titleValidation.message) : "";

    // oneLineDescription
    let oneLineDescriptionValidation = this.validator.isValidOneLineDescription(this.courseMeta.oneLineDescription);
    (!oneLineDescriptionValidation.isValid) ? this.errors.push(oneLineDescriptionValidation.message) : "";

    // category
    let categoryValidation = this.validator.isValidCategory(this.courseMeta.category);
    (!categoryValidation.isValid) ? this.errors.push(categoryValidation.message) : "";

    // description
    let descriptionvalidation = this.validator.isValidDescription(this.courseMeta.description);
    (!descriptionvalidation.isValid) ? this.errors.push(descriptionvalidation.message) : "";

    return this.errors.length == 0;
  }

  revalidateForm() {
    if (this.isCourseCreationAttempted) {
      this.isFormOK();
    }
  }

}
