import { VariableDefinitions } from 'sequential-workflow-editor-model';
import { Definition } from 'sequential-workflow-model';

export interface BotDefinition extends Definition {
  properties: {
    inputs: VariableDefinitions;
    internals: VariableDefinitions;
    outputs: VariableDefinitions;
  };
}
