import { Injectable } from '@angular/core';

@Injectable()
export class Utils {

	constructor() { }
	getRawChapterTemplate(): any {
		return HaskellCourse.chapters[0];
	}

	getRawCourseTemplate(): any {
		return HaskellCourse;
	}

	getRawPolicyStatement(): any {
		return HaskellCourse.chapters[0].sections[0].policy.statements[0];
	}

	getRawStatementCondition(): any {
		return HaskellCourse.chapters[0].sections[0].policy.statements[0].conditions[0];
	}

	getRawSectionTemplate(): any {
		return HaskellCourse.chapters[0].sections[0];
	}
}

export const COURSE_ID: string = "courseId";

const HaskellCourse: any = {
	"meta": {
		"name": "Haskell",
		"category": "ProgrammingLanguage",
		"title": "Learn Haskell Programming",
		"description": "This course is about learning Haskell",
		"author": "Sanjay",
		"beginChapterIndex": 0
	},

	"chapters": [{
		"meta": {
			"title": "Introduction",
			"beginSectionIndex": 0
		},
		"sections": [{
			"title": "Introduction: What is Haskell",
			"instruction": {
				"text": "Section 1 - Type hello world.\nThat's how you learn."
			},
			"validInputs": [
				"Hello World",
				"Hello there"
			],
			"inputPlaceholder": "Say hello to the world",
			"output": {
				"text": "Click Next to continue"
			},
			"policy": {
				"statements": [{
					"description": "basic case",
					"conditions": [{
						"lhs": "$inputIdeal.toString().toLowerCase()",
						"operator": "==",
						"rhs": "$inputReal.toString().toLowerCase()"
					}]
				}, {
					"description": "basic case 2",
					"conditions": [{
						"lhs": "$inputIdeal.toString().toLowerCase()",
						"operator": "==",
						"rhs": "$inputReal.toString().toLowerCase()"
					}]
				}]
			}
		}, {
			"title": "Why use haskell",
			"instruction": {
				"text": "Section 2 - Tell us why use haskell by saying hi there."
			},
			"validInputs": [
				"Hello World",
				"Hi there"
			],
			"inputPlaceholder": "Say hi to the world",
			"output": {
				"text": "Click Next to continue"
			},
			"policy": {
				"statements": [{
					"description": "basic case",
					"conditions": [{
						"lhs": "$inputIdeal.toString().toLowerCase()",
						"operator": "==",
						"rhs": "$inputReal.toString().toLowerCase()"
					}]
				}, {
					"description": "basic case 2",
					"conditions": [{
						"lhs": "$inputIdeal.toString().toLowerCase()",
						"operator": "==",
						"rhs": "$inputReal.toString().toLowerCase()"
					}]
				}]
			}
		}]
	}, {
		"meta": {
			"title": "A bit more",
			"beginSectionIndex": 0
		},
		"sections": [{
			"title": "Introduction: What is Haskell",
			"instruction": {
				"text": "Section 1 - Type hello world.\nThat's how you learn."
			},
			"validInputs": [
				"Hello World",
				"Hello there"
			],
			"inputPlaceholder": "Say hello to the world",
			"output": {
				"text": "Click Next to continue"
			},
			"policy": {
				"statements": [{
					"description": "basic case",
					"conditions": [{
						"lhs": "$inputIdeal.toString().toLowerCase()",
						"operator": "==",
						"rhs": "$inputReal.toString().toLowerCase()"
					}]
				}, {
					"description": "basic case 2",
					"conditions": [{
						"lhs": "$inputIdeal.toString().toLowerCase()",
						"operator": "==",
						"rhs": "$inputReal.toString().toLowerCase()"
					}]
				}]
			}
		}, {
			"title": "Why use haskell",
			"instruction": {
				"text": "Section 2 - Tell us why use haskell by saying hi there."
			},
			"validInputs": [
				"Hello World",
				"Hi there"
			],
			"inputPlaceholder": "Say hi to the world",
			"output": {
				"text": "Click Next to continue"
			},
			"policy": {
				"statements": [{
					"description": "basic case",
					"conditions": [{
						"lhs": "$inputIdeal.toString().toLowerCase()",
						"operator": "==",
						"rhs": "$inputReal.toString().toLowerCase()"
					}]
				}, {
					"description": "basic case 2",
					"conditions": [{
						"lhs": "$inputIdeal.toString().toLowerCase()",
						"operator": "==",
						"rhs": "$inputReal.toString().toLowerCase()"
					}]
				}]
			}
		}]
	}]
}