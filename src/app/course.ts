export class Course {
    id: string;
    meta: Meta;
    chapters: Chapter[] = [];

    constructor(id: string, meta: Meta, chapters: Chapter[]) {
        this.id = id;
        this.meta = meta;
        
        this.chapters = chapters;
    }

    static newInstanceFromRawData (id: string, rawMeta: any, rawChapters: any): Course {
        let meta: Meta = new Meta(rawMeta);
        let chapters: Chapter[] = [];

        let chapterId: number = 0;
        for (let rawChapter of rawChapters) {
            chapters.push(new Chapter(chapterId, rawChapter));
            chapterId++;
        }

        return new Course(id, meta, chapters);
    }

    getDescription(): string {
        return this.meta.description;
    }

    getChapterCount(): number {
        return this.chapters.length;
    }

    getSectionCount(chapterId: number): number {
        if (!this.chapters[chapterId]) {
            return -1;
        }

        return this.chapters[chapterId].sections.length;
    }

    getMaxSectionId(chapterId: number): number {
        return this.getSectionCount(chapterId) - 1;
    }

    getMinSectionId(chapterId: number): number {
        return this.chapters[chapterId].meta.beginSectionIndex;
    }

    getMaxChapterId(): number {
        return this.getChapterCount() - 1;
    }

    getMinChapterId(): number {
        return this.meta.beginChapterIndex;
    }

    getJSONString(): string {
        return JSON.stringify(this);
    }

    addChapter(rawChapter: any) {
        this.chapters.push(new Chapter(this.getChapterCount(), rawChapter));
    }
}

export class Meta {
    category: string;
    title: string;
    oneLineDescription: string;
    description: string;
    author: string;
    beginChapterIndex: number;

    constructor(rawMeta: any) {
        this.category = rawMeta.category;
        this.title = rawMeta.title;
        this.oneLineDescription = rawMeta.oneLineDescription;
        this.description = rawMeta.description;
        this.author = rawMeta.author;
        this.beginChapterIndex = rawMeta.beginChapterIndex;
    }

    static newInstance(): Meta {
        let rawMeta = { category: "ProgrammingLanguage", title: "", 
            description: "", oneLineDescription: "",
            author: "", beginChapterIndex: 0 }
        return new Meta(rawMeta);
    }
}

export class Chapter {
    id: number;
    meta: ChapterMeta;
    sections: Section[] = [];

    constructor(id: number, rawChapter: any) {
        this.id = id;
        this.meta = new ChapterMeta(rawChapter.meta.title, rawChapter.meta.beginSectionIndex);

        let sectionId: number = 0;
        for (var rawSection of rawChapter.sections) {
            this.sections.push(new Section(sectionId, rawSection));
            sectionId++;
        }
    }

    getSectionCount(): number {
        return this.sections.length;
    }

    addSection(rawSection: any) {
        this.sections.push(new Section(this.getSectionCount(), rawSection));
    }
}

export class ChapterMeta {
    title: string;
    beginSectionIndex: number;

    constructor(title: string, beginSectionIndex: number) {
        this.title = title;
        this.beginSectionIndex = beginSectionIndex;
    }
}

export class Section {
    id: number;
    title: string;
    instruction: Instruction;
    validInputs: string[] = [];
    inputPlaceholder: string;
    output: Output;
    policy: Policy;

    constructor(id: number, rawSection: any) {
        this.id = id;
        this.title = rawSection.title;
        this.instruction = new Instruction(rawSection.instruction);
        this.inputPlaceholder = rawSection.inputPlaceholder;
        this.output = new Output(rawSection.output);
        this.policy = new Policy(rawSection.policy);

        for (let validInput of rawSection.validInputs) {
            this.validInputs.push(validInput);
        }
    }

    getPolicy(): Policy {
        return this.policy;
    }
}

export class Instruction {
    text: string;

    constructor(rawInstruction: any) {
        this.text = rawInstruction.text;
    }
}

export class Output {
    text: string;

    constructor(rawSectionOutput: any) {
        this.text = rawSectionOutput.text;
    }
}

export class Policy {
    statements: PolicyStatement[] = [];

    constructor(rawSectionPolicy: any) {

        let statementId: number = 0;
        for (let rawStatement of rawSectionPolicy.statements) {
            this.statements.push(new PolicyStatement(statementId, rawStatement));
            statementId++;
        }
    }

    getStatementCount(): number {
        return this.statements.length;
    }

    addStatement(rawPolicyStatement: any) {
        this.statements.push(new PolicyStatement(this.getStatementCount(), rawPolicyStatement));
    }
}

export class PolicyStatement {
    statementId: number;
    description: string;
    conditions: PolicyCondition[] = [];

    constructor(statementId: number, rawStatement: any) {
        this.statementId = statementId;
        this.description = rawStatement.description;

        let conditionId: number = 0;
        for (let rawCondition of rawStatement.conditions) {
            this.conditions.push(new PolicyCondition(conditionId, rawCondition));
            conditionId++;
        }
    }

    getConditionCount(): number {
        return this.conditions.length;
    }

    addCondition(rawCondition: any) {
        this.conditions.push(new PolicyCondition(this.getConditionCount(), rawCondition));
    }
}

export class PolicyCondition {
    conditionId: number;
    lhs: string;
    operator: string;
    rhs: string;

    constructor(conditionId: number, rawCondition: any) {
        this.conditionId = conditionId;
        this.lhs = rawCondition.lhs;
        this.operator = rawCondition.operator;
        this.rhs = rawCondition.rhs;
    }
}