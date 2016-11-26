import { EditorOptionsComponent } from './editor-options/editor-options.component';
import { Observable } from 'rxjs/Observable';
import { CoursesService } from './../shared/courses.service';
import { Course } from './../course';
import { Injectable } from '@angular/core';

@Injectable()
export class EditorHelperService {
    activeEditor: AbstractEditor;
    editorUI: EditorUI;

    constructor(private coursesService: CoursesService) { }

    save(editorOptionsUI: EditorOptionsUI) {
        editorOptionsUI.setSavingMode();
        console.log(this.activeEditor);
        this.activeEditor.save()
            .subscribe(
            response => {
                editorOptionsUI.setSuccessMode();
                this.coursesService.putInCache(this.activeEditor.getCourse());
                this.editorUI.setCourse(this.activeEditor.getCourse());
            },
            error => {
                editorOptionsUI.setErrorMode();
            }
            )

    }

    setActiveEditor(editor: AbstractEditor) {
        this.activeEditor = editor;
    }

    setEditorUI(editorUI: EditorUI) {
        this.editorUI = editorUI;
    }

    saveCourseMetadata(course: Course): Observable<any> {
        return this.coursesService.saveCourse(course);
    }

    saveChapterMetadata(course: Course): Observable<any> {
        return this.coursesService.saveCourseChapters(course);
    }

    saveSection(course: Course): Observable<any> {
        return this.coursesService.saveCourseChapters(course);
    }

}

export interface AbstractEditor {
    save(): Observable<any>;
    getCourse(): Course;
}

export interface EditorOptionsUI {
    setSuccessMode();
    setErrorMode();
    setSavingMode();
}

export interface EditorUI {
    setCourse(course: Course);
}