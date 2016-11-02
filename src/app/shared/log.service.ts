import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
    constructor() { }

    error(tag: string, message: any) {
        console.log("[ERROR]", tag, message);
    }

    debug(tag: string, message: any) {
        console.log("[DEBUG]", tag, message);
    }
}