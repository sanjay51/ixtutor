import { EditorUI, EditorHelperService } from './editor-helper.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Course, Section, Chapter } from './../course';
import { CoursesService } from './../shared/courses.service';

@Component({
    selector: 'my-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, EditorUI {
    course: Course;
    courseId: string;
    courseOriginal: string;

    constructor(private router: Router, private route: ActivatedRoute,
        private coursesService: CoursesService,
        private editorHelper: EditorHelperService) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.courseId = params['courseId'];
            this.editorHelper.setEditorUI(this);

            this.coursesService.getCourse(this.courseId)
                .subscribe(course => {
                    this.course = course;
                    this.courseOriginal = JSON.stringify(this.course);
                });
        })
    }

    setCourse(course: Course) {
        this.course = course;
    }

    loadSectionEditor(chapter: Chapter, section: Section) {
        let link = ['/editor/course/', this.courseId, 'chapter', chapter.id, 'section', section.id];
        this.router.navigate(link);
    }

    loadChapterMetadataEditor(chapter: Chapter) {
        let link = ['/editor/course/', this.courseId, 'chapter', chapter.id, 'metadata'];
        this.router.navigate(link);
    }

    loadCourseMetadataEditor() {
        let link = ['/editor/course/', this.courseId, 'metadata'];
        this.router.navigate(link);
    }
}