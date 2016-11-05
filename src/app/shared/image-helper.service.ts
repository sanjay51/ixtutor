import { Course } from './../course';
import { Injectable } from '@angular/core';


@Injectable()
export class ImageHelperService {
  urlmap = {};
  DEFAULT_COURSE_IMAGE_PATH = "assets/images/default.png";

  constructor() { }

  getCourseImageURL(course: Course): string {
    let key = "assets/images/" + course.id + ".png";

    if (this.urlmap[key]) {
      return this.urlmap[key];
    }

    this.urlmap[key] = key;
    return key;
  }

  updateCourseImageURLtoDefault(course: Course) {
    let key = "assets/images/" + course.id + ".png";

    if (this.urlmap[key]) {
      this.urlmap[key] = this.DEFAULT_COURSE_IMAGE_PATH;
    }
  }
}
