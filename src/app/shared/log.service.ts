import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
    constructor() { }

    error(tag: string, message: string) {
        console.log("[ERROR]", tag, message);
    }

    debug(tag: string, message: string) {
        console.log("[DEBUG]", tag, message);
    }
}