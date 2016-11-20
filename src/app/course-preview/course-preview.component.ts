import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Course } from '../course';
import { CoursesService } from '../shared/courses.service';
import { ImageHelperService } from '../shared/image-helper.service';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.css']
})
export class CoursePreviewComponent implements OnInit {
  courseId: string;
  course: Course;

  constructor(private router: Router, private route: ActivatedRoute, 
        private coursesService: CoursesService,
        private imageHelperService: ImageHelperService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.courseId = params['id'];

      this.coursesService.getCourse(this.courseId)
        .subscribe(
        course => this.course = course
        );
    });
  }

  gotoCourse() {
    let link = ['/course', this.course.id, 'chapter', 0, 'section', 0];
    this.router.navigate(link);
  }

    getCourseImageURL(course: Course): string {
        return this.imageHelperService.getCourseImageURL(course);
    }

    updateCourseImageURLtoDefault(course: Course) {
        this.imageHelperService.updateCourseImageURLtoDefault(course);
    }
}
