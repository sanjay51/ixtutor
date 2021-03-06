import { Observable } from 'rxjs/Observable';
import { AbstractEditor, EditorHelperService } from './../editor-helper.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoursesService } from '../../shared/courses.service';
import { Course, ChapterMeta, Chapter, Section } from '../../course';
import { Utils } from '../../shared/utils.service';

@Component({
    selector: 'chapter-metadata-edit',
    templateUrl: './chapter-metadata-edit.component.html'
})
export class ChapterMetadataEditComponent implements OnInit, AbstractEditor {
    courseId: string;
    chapterId: number;

    course: Course;
    chapter: Chapter;
    chapterMeta: ChapterMeta;

    constructor(private router: Router, private route: ActivatedRoute,
        private coursesService: CoursesService, private utils: Utils,
        private editorHelper: EditorHelperService) { }

    ngOnInit() {
        this.editorHelper.setActiveEditor(this);
        this.route.parent.params.forEach((params: Params) => {
            this.courseId = params['courseId'];
        });

        this.route.params.forEach((params: Params) => {
            this.chapterId = +params['chapterId'];

            if (this.course) {
                this.chapter = this.course.chapters[this.chapterId];
                this.chapterMeta = this.chapter.meta;
            }
        });

        this.coursesService.getCourse(this.courseId)
            .subscribe(course => {
                this.course = course;
                this.chapter = this.course.chapters[this.chapterId];
                this.chapterMeta = this.chapter.meta;
            });
    }

    save(): Observable<any> {
        return this.editorHelper.saveChapterMetadata(this.course);
    }

    getCourse(): Course {
        return this.course;
    }

    loadSectionEditor(section: Section) {
        let link = ['/editor/course/', this.courseId, 'chapter', this.chapter.id, 'section', section.id];
        this.router.navigate(link);
    }

    addSection() {
        this.chapter.addSection(this.utils.getRawSectionTemplate());
    }
}