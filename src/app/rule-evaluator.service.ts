import { Policy, PolicyStatement, PolicyCondition } from './course';
import { Injectable } from '@angular/core';

@Injectable()
export class RuleEvaluatorService {

    constructor() { }

    evaluate(target: string, input: string, policy: Policy): boolean {
        if (policy.statements.length == 0) {
            return true;
        }

        for (let statement of policy.statements) {
            let statementMatch: boolean = true;
            for (let condition of statement.conditions) {
                statementMatch = statementMatch && this.evaluateCondition(condition, input, target);
            }

            if (statementMatch) {
                return true;
            }
        }

        return false;
    }

    evaluateCondition(condition: PolicyCondition, $inputIdeal: string, $inputReal: string): boolean {
        let evalLHS: any = eval(condition.lhs);
        let evalRHS: any = eval(condition.rhs);

        let evaluationResult: boolean = eval("evalLHS " + condition.operator + " evalRHS");

        return evaluationResult;
    }
}