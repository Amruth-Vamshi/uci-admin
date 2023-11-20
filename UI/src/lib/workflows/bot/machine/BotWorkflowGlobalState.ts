import { DynamicsService } from './services/DynamicsService';
import { LoggerService } from './services/LoggerService';
import { EvaluatorService } from './services/EvaluatorService';
import { VariableState, VariablesService } from './services/VariablesService';

export interface BotWorkflowGlobalState {
  readonly variablesState: VariableState;

  // Services should have $ prefix.
  readonly $logger: LoggerService;
  readonly $variables: VariablesService;
  readonly $dynamics: DynamicsService;
  readonly $evaluator: EvaluatorService;
}
