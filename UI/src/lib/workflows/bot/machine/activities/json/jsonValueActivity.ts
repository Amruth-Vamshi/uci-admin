import { createAtomActivity } from 'sequential-workflow-machine';
import { JsonValueStep } from '../../../model/steps/json/jsonValueStepModel';
import { BotWorkflowGlobalState } from '../../BotWorkflowGlobalState';

export const jsonValueActivity = createAtomActivity<JsonValueStep, BotWorkflowGlobalState>('jsonValue', {
  init: () => ({}),
  handler: async (step: JsonValueStep, { $variables, $evaluator: $richText }: BotWorkflowGlobalState) => {
    if (!step.properties.json || !step.properties.output) {
      throw new Error('Invalid model');
    }

    const json = $variables.read<object>(step.properties.json.name);

    const path = $richText.evaluatePath(step.properties.path);
    const value = path.read(json);

    const targetValue = castToType(value, step.properties.output.type);
    $variables.set(step.properties.output.name, targetValue);
  }
});

function castToType(value: unknown, type: string): unknown {
  switch (type) {
    case 'string':
      return String(value);
    case 'number':
      return Number(value);
    default:
      throw new Error('Not supported target variable type');
  }
}
