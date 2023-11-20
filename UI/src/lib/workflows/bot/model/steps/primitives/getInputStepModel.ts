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
  
  export interface GetInputStep extends Step {
    type: 'getInput';
    componentType: 'task';
    properties: {
        input: NullableAnyVariable;
    };
  }
  
  export const GetInputStepModel = createStepModel<GetInputStep>('getInput', 'task', step => {
    step.label('getInput');
    step.category('Primitives');
    step.description('Get user input');
  
    step
      .name()
    //   .dependentProperty('input')
      .dependentProperty('input')
      .value(
        createGeneratedStringValueModel({
          generator(context) {
            const output = context.formatPropertyValue('input', StepNameFormatter.formatVariable);
            return `getUserInput`;
          }
        })
      );

      step
      .property('input')
      .value(
        createNullableAnyVariableValueModel({
          valueTypes: ['string'],
          isRequired: true
        })
      )
  
    // step.property('input').value(
    //   createDynamicValueModel({
    //     models: [
    //       createNullableAnyVariableValueModel({
    //         isRequired: true
    //       }),
    //       createStringValueModel({}),
    //       createNumberValueModel({}),
    //       createBooleanValueModel({})
    //     ]
    //   })
    // );
  });
  