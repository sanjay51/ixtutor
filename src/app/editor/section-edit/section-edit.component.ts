import { Instruction } from './../../course';
import { Observable } from 'rxjs/Observable';
import { AbstractEditor, EditorHelperService } from './../editor-helper.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoursesService } from '../../shared/courses.service';
import { Course, Section, PolicyStatement } from '../../course';
import { Utils } from '../../shared/utils.service';

@Component({
    selector: 'section-edit',
    templateUrl: './section-edit.component.html'
})
export class SectionEditComponent implements OnInit, AbstractEditor {
    courseId: string;
    chapterId: number;
    sectionId: number;

    course: Course;
    section: Section;

    constructor(private router: Router, private route: ActivatedRoute,
        private coursesService: CoursesService, private utils: Utils,
        private editorHelper: EditorHelperService) { }

    ngOnInit() {
        this.editorHelper.setActiveEditor(this);
        this.route.parent.params.forEach((params: Params) => {
            this.courseId = params['courseId'];
        });

        this.route.params.forEach((params: Params) => {
            this.sectionId = +params['sectionId'];
            this.chapterId = +params['chapterId'];

            if (this.course) {
                this.section = this.course.chapters[this.chapterId].sections[this.sectionId];
            }
        });

        this.coursesService.getCourse(this.courseId)
            .subscribe(course => {
                this.course = course;
                this.section = this.course.chapters[this.chapterId].sections[this.sectionId];
            });
    }

    save(): Observable<any> {
        return this.editorHelper.saveSection(this.course);
    }

    getCourse(): Course {
        return this.course;
    }

    showDiff() {
        // TODO: Show a diff of current vs updated section.
    }

    addValidInput() {
        this.section.validInputs.push("Hello world");
    }

    addPolicyStatement() {
        let rawStatement = this.utils.getRawPolicyStatement();
        this.section.policy.addStatement(rawStatement);
    }

    addStatementCondition(statement: PolicyStatement) {
        let rawCondition = this.utils.getRawStatementCondition();
        statement.addCondition(rawCondition);
    }

    editInstructions() {
        let instructions: Instruction = this.section.instruction;
        this.editorHelper.showInstructionEditorWidget(instructions);
    }
}