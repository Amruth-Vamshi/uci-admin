import { WorkflowMachineInterpreter, createWorkflowMachineBuilder } from 'sequential-workflow-machine';
import { activitySet } from './activitySet';
import { BotWorkflowGlobalState } from './BotWorkflowGlobalState';
import { LoggerService } from './services/LoggerService';
import { VariablesService, createVariableState } from './services/VariablesService';
import { DynamicsService } from './services/DynamicsService';
import { EvaluatorService } from './services/EvaluatorService';
import { BotDefinition } from '../model/BotDefinition';

const builder = createWorkflowMachineBuilder(activitySet);

export class BotWorkflowMachine {
  public static create(definition: BotDefinition, inputs: Record<string, unknown>): BotWorkflowMachine {
    const machine = builder.build(definition);
    const logger = new LoggerService();
    const variablesState = createVariableState(inputs);
    const variables = new VariablesService(variablesState);
    const dynamics = new DynamicsService(variables);
    const evaluator = new EvaluatorService(variables);

    const interpreter = machine.create({
      init: () => {
        return {
          variablesState,
          $logger: logger,
          $variables: variables,
          $dynamics: dynamics,
          $evaluator: evaluator
        };
      }
    });
    return new BotWorkflowMachine(definition, interpreter, logger);
  }

  private constructor(
    private readonly definition: BotDefinition,
    private readonly interpreter: WorkflowMachineInterpreter<BotWorkflowGlobalState>,
    private readonly logger: LoggerService
  ) {}

  public start() {
    this.interpreter.start();
  }

  public async wait(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.interpreter.onDone(() => {
        const snapshot = this.interpreter.getSnapshot();
        if (snapshot.unhandledError) {
          reject(snapshot.unhandledError);
        } else {
          resolve();
        }
      });
    });
  }

  public readLogs(): string[] {
    return this.logger.popAll();
  }

  public readOutputs(): Record<string, unknown> {
    const values: Record<string, unknown> = {};
    const snapshot = this.interpreter.getSnapshot();
    this.definition.properties.outputs.variables.forEach(variable => {
      if (snapshot.globalState.$variables.isSet(variable.name)) {
        const value = snapshot.globalState.$variables.read(variable.name);
        values[variable.name] = value;
      }
    });
    return values;
  }
}
