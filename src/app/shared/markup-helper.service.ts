import { Injectable } from '@angular/core';

@Injectable()
export class MarkupHelperService {

    constructor() { }

    parseToHTML(markupText: string): string {
        return this.replaceCode(
            this.replaceBoldItalic(this.replaceLi(this.replaceHeadings(markupText))));
    }

    replaceHeadings(markupText: string): string {
        return markupText
            .replace(/\n(==== |====)(.*)====/g, "<h4>$2</h4>")
            .replace(/\n(=== |===)(.*)===/g, "<h3>$2</h3>")
            .replace(/\n(== |==)(.*)==/g, "<h2>$2</h2>")
            .replace(/\n(= |=)(.*)=/g, "<h1>$2</h1><hr/>");

    }

    replaceLi(markupText: string): string {
        return markupText
            .replace(/\n\*(.*)/g, "<br/><li>$1</li>")
    }

    replaceBoldItalic(markupText: string): string {
        return markupText
            .replace(/\'\'\'\'\'(.*)\'\'\'\'\'/g, "<b><i>$1</i></b>")
            .replace(/\'\'\'(.*)\'\'\'/g, "<b>$1</b>")
            .replace(/\'\'(.*)\'\'/g, "<i>$1</i>")
    }

    replaceCode(markupText: string): string {
        return markupText
            .replace(/\n={\n/g, "<br/><pre class=\"code\">")
            .replace(/\n}=\n/g, "</pre><br/>");
    }

}
