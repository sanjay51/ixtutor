import { MarkupHelperService } from './../../shared/markup-helper.service';
import { Instruction } from './../../course';
import { EditorHelperService, InstructionsEditorUI } from './../editor-helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-instructions-editor-widget',
    templateUrl: './instructions-editor-widget.component.html',
    styleUrls: ['./instructions-editor-widget.component.css']
})
export class InstructionsEditorWidgetComponent implements OnInit, InstructionsEditorUI {
    isVisible = false;
    instructions: Instruction;

    constructor(private editorHelper: EditorHelperService,
        private markupHelper: MarkupHelperService) { }

    ngOnInit() {
        this.editorHelper.setInstructionsEditorUI(this);
    }

    show(instructions: Instruction) {
        this.instructions = instructions;
        this.isVisible = true;
    }

    getCompiledInstructions() {
        return this.markupHelper.parseToHTML(this.instructions.text);
    }

    hide() {
        this.isVisible = false;
    }
}