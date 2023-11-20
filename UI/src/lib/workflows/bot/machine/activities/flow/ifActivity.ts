import { branchName, createForkActivity } from 'sequential-workflow-machine';
import { BotWorkflowGlobalState } from '../../BotWorkflowGlobalState';
import { IfStep } from '../../../model/steps/flow/ifStepModel';

export const ifActivity = createForkActivity<IfStep, BotWorkflowGlobalState>('if', {
  init: () => ({}),
  handler: async (step: IfStep, { $dynamics }: BotWorkflowGlobalState) => {
    const a = $dynamics.readAny<any>(step.properties.a);
    const b = $dynamics.readAny<any>(step.properties.b);

    const result = compare(a, b, step.properties.comparison);

    return branchName(result ? 'true' : 'false');
  }
});

function compare(a: any, b: any, comparison: string) {
  switch (comparison) {
    case '==':
      return a == b;
    case '===':
      return a === b;
    case '!=':
      return a != b;
    case '!==':
      return a !== b;
    case '>':
      return a > b;
    case '<':
      return a < b;
    case '>=':
      return a >= b;
    case '<=':
      return a <= b;
  }
  throw new Error(`Comparison is not supported: ${comparison}`);
}
