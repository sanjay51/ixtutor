import { EditorHelperService, EditorOptionsUI } from './../editor-helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-editor-options',
    templateUrl: './editor-options.component.html',
    styleUrls: ['./editor-options.component.css']
})
export class EditorOptionsComponent implements OnInit, EditorOptionsUI {
    saveStatus: SaveStatus;
    saveButtonText = "Save";

    SAVE_TEXT = "Save";
    SAVING_TEXT = "Saving..";

    constructor(private editorHelper: EditorHelperService) { }

    ngOnInit() {
        this.saveStatus = SaveStatus.default;
    }

    save() {
        this.editorHelper.save(this);
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