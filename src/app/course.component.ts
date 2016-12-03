import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Course, Section, Policy, Chapter } from './course';
import { CoursesService } from './shared/courses.service';
import { RuleEvaluatorService } from './rule-evaluator.service';
import { MarkupHelperService } from './shared/markup-helper.service';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
    courseId: string;
    chapterId: number;
    sectionId: number;

    course: Course;
    chapter: Chapter;
    section: Section;

    // two way bound members
    userInput: string;
    output: string;
    isCompleted: boolean = false; // has user completed current section

    constructor(private route: ActivatedRoute, private ruleEvaluatorService: RuleEvaluatorService,
        private coursesService: CoursesService, private router: Router,
        private markupHelperService: MarkupHelperService) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.courseId = params['id'];
            this.chapterId = +params['chapter'];
            this.sectionId = +params['section'];

            /* Don't reload course if already loaded.
             * ngOnInit() is called everytime the route changes,
             * but the course object only need to be initialized once, so
             * no new network call is needed on chapter or section change.
             */
            if (this.course) {
                this.initCourse(this.course);
                return;
            }

            this.coursesService.getCourse(this.courseId)
                .subscribe(
                    course => this.initCourse(course)
                );
        })
    }

    initCourse(course: Course) {
        this.course = course;
        this.chapter = this.course.chapters[this.chapterId];
        this.section = this.chapter.sections[this.sectionId];
    }

    getInstructionText() {
        return this.markupHelperService.parseToHTML(this.section.instruction.text);
    }

    evaluate(): void {
        for (let text of this.getSection().validInputs) {
            let policy: Policy = this.getSection().getPolicy();
            let isMatch: boolean = this.ruleEvaluatorService.evaluate(this.userInput, text, policy);

            if (isMatch) {
                this.markSectionAsCompleted();
                break;
            } else {
                this.output = this.getSection().output.text + "Please check again.";
            }
        }
    }

    getSection(): Section {
        return this.course.chapters[this.chapterId].sections[this.sectionId];
    }

    getInputPlaceholder(): string {
        return this.getSection().inputPlaceholder;
    }

    markSectionAsCompleted() {
        this.isCompleted = true;
        this.output = this.getSection().output.text + "Hit Next to continue.";
    }

    gotoNextSection(): void {
        let newChapterId: number = this.chapterId;
        let newSectionId: number = this.sectionId;

        if (this.sectionId >= this.course.getMaxSectionId(this.chapterId)) {
            if (this.chapterId >= this.course.getMaxChapterId()) {
                // Already at the end of course. Do nothing.
                // TODO: This should show end of course page later.
                return;
            }

            // Goto 1st section of next chapter
            newSectionId = 0;
            newChapterId = this.chapterId + 1;
        } else {
            // Goto next section of same chapter
            newSectionId = this.sectionId + 1;
        }

        this.isCompleted = false;
        let link = ['/course', this.course.id, 'chapter', newChapterId, 'section', newSectionId];
        this.router.navigate(link);
    }

    gotoPreviousSection(): void {
        let newChapterId: number = this.chapterId;
        let newSectionId: number = this.sectionId;

        if (this.sectionId <= this.course.getMinSectionId(this.chapterId)) {
            if (this.chapterId <= this.course.getMinChapterId()) {
                // Already at the beginning of course. Do nothing.
                // TODO: Disable back or previous button on UI
                return;
            }

            // Goto final section of previous chapter
            newChapterId = this.chapterId - 1;
            newSectionId = this.course.getMaxSectionId(newChapterId);
        } else {
            // Goto previous section of same chapter
            newSectionId = newSectionId - 1;
        }

        let link = ['/course', this.course.id, 'chapter', newChapterId, 'section', newSectionId];
        this.router.navigate(link);
    }

    loadChapter(chapter: Chapter) {
        let newChapterId: number = chapter.id;
        let newSectionId: number = chapter.meta.beginSectionIndex;

        let link = ['/course', this.course.id, 'chapter', newChapterId, 'section', newSectionId];
        this.router.navigate(link);
    }

    loadSection(section: Section) {
        let newSectionId: number = section.id;
        let link = ['/course', this.course.id, 'chapter', this.chapterId, 'section', newSectionId];
        this.router.navigate(link);
    }
}