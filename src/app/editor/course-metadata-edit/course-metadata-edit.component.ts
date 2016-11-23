import { ImageHelperService } from './../../shared/image-helper.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoursesService } from '../../shared/courses.service';
import { Course, Meta, Chapter } from '../../course';
import { Utils } from '../../shared/utils.service';

@Component({
    selector: 'course-metadata-edit',
    templateUrl: './course-metadata-edit.component.html',
    styleUrls: ['./course-metadata-edit.component.css']
})
export class CourseMetadataEditComponent implements OnInit {
    courseId: string;

    course: Course;
    meta: Meta;
    saveStatus: SaveStatus;
    saveButtonText = "Save";

    SAVE_TEXT = "Save";
    SAVING_TEXT = "Saving..";

    constructor(private router: Router, private route: ActivatedRoute,
        private coursesService: CoursesService, private utils: Utils) { }

    ngOnInit() {
        this.route.parent.params.forEach((params: Params) => {
            this.courseId = params['courseId'];
            this.saveStatus = SaveStatus.default;

            this.coursesService.getCourse(this.courseId)
                .subscribe(course => {
                    this.course = course;
                    this.meta = this.course.meta;
                });
        });
    }

    save() {
        this.setSavingMode();
        this.coursesService.saveCourse(this.course)
            .subscribe(
                response => {
                    this.setSuccessMode();
                },
                error => {
                    this.setErrorMode();
                }
            )
    }

    loadChapterMetadataEditor(chapter: Chapter) {
        let link = ['/editor/course/', this.courseId, 'chapter', chapter.id, 'metadata'];
        this.router.navigate(link);
    }

    addChapter() {
        this.course.addChapter(this.utils.getRawChapterTemplate());
    }

    setSavingMode() {
        this.saveButtonText = this.SAVING_TEXT;
        this.saveStatus = SaveStatus.saving;
    }

    setErrorMode() {
        this.saveButtonText = this.SAVE_TEXT;
        this.saveStatus = SaveStatus.error;
    }

    setSuccessMode() {
        this.saveButtonText = this.SAVE_TEXT;
        this.saveStatus = SaveStatus.success;
    }
}

enum SaveStatus {
    default, success, error, saving
}