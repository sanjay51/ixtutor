import { Injectable } from '@angular/core';

@Injectable()
export class MarkupHelperService {

  constructor() { }

  parseToHTML(markupText: string): string {
    return markupText
      .replace(/====(.*)====/, "<h4>$1</h4>")
      .replace(/===(.*)===/, "<h3>$1</h3>")
      .replace(/==(.*)==/, "<h2>$1</h2>")
      .replace(/=(.*)=/, "<h1>$1</h1><hr/>");
  }

}
