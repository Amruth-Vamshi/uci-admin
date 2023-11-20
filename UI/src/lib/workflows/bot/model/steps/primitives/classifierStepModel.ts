import {
    Dynamic,
    NullableAnyVariable,
    createBooleanValueModel,
    createStepModel,
    createDynamicValueModel,
    createGeneratedStringValueModel,
    createNullableAnyVariableValueModel,
    createNumberValueModel,
    createStringValueModel,
    AnyVariable
  } from 'sequential-workflow-editor-model';
  import { Step } from 'sequential-workflow-model';
  import { StepNameFormatter } from '../../StepNameFormatter';
  
  export interface ClassifierStep extends Step {
    type: 'classifier';
    componentType: 'task';
    properties: {
      response: NullableAnyVariable;
    };
  }
  
  export const classifierStepModel = createStepModel<ClassifierStep>('classifier', 'task', step => {
    step.label('classifier');
    step.category('Primitives');
    step.description('Gets the intent of the text passed.');
  
    step
      .name()
      .dependentProperty('response')
      .value(
        createGeneratedStringValueModel({
          generator(context) {
            // const input = context.formatPropertyValue('input', StepNameFormatter.formatVariable);
            const output = context.formatPropertyValue('response', StepNameFormatter.formatVariable);
            return 'classifier';
          }
        })
      );
  
    step
    .property('response')
    .value(
      createNullableAnyVariableValueModel({
        valueTypes: ['string'],
        isRequired: true
      })
    )
    .label('Response variable');
  });
  