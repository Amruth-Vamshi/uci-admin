import { createAtomActivity } from 'sequential-workflow-machine';
import { BotWorkflowGlobalState } from '../../BotWorkflowGlobalState';
import { LogStep } from '../../../model/steps/tracing/logStepModel';
import { formatVariableName } from 'sequential-workflow-editor';

export const logActivity = createAtomActivity<LogStep, BotWorkflowGlobalState>('log', {
  init: () => ({}),
  handler: async (step: LogStep, { $variables, $dynamics, $logger }: BotWorkflowGlobalState) => {
    let message = $dynamics.readAny(step.properties.message);

    for (const variable of step.properties.variables.variables) {
      let value = $variables.isSet(variable.name) ? $variables.read(variable.name) ?? '<empty>' : '<not set>';
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      const name = formatVariableName(variable.name);
      message += `, ${name}=${value} (${variable.type})`;
    }

    $logger.log(message);
  }
});
