import { createAtomActivity } from 'sequential-workflow-machine';
import { BotWorkflowGlobalState } from '../../BotWorkflowGlobalState';
import { RandomStep } from '../../../model/steps/primitives/randomStepModel';

export const randomActivity = createAtomActivity<RandomStep, BotWorkflowGlobalState>('random', {
  init: () => ({}),
  handler: async (step: RandomStep, { $variables, $dynamics }: BotWorkflowGlobalState) => {
    if (!step.properties.result) {
      throw new Error('Result variable is not defined');
    }

    const from = $dynamics.readAny<number>(step.properties.from);
    const to = $dynamics.readAny<number>(step.properties.to);

    const value = Math.floor(Math.random() * (to - from + 1) + from);

    $variables.set(step.properties.result.name, value);
  }
});
