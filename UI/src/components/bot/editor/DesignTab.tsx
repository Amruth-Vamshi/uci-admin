'use client';

import { BotDefinitionModel } from '@/lib/workflows/bot/model/botDefinitionModel';
import { BotDefinition } from '@/lib/workflows/bot/model/BotDefinition';
import { UidGenerator } from '@/lib/core/UidGenerator';
import { useEffect, useMemo, useRef } from 'react';
import { SequentialWorkflowDesigner, WrappedDefinition } from 'sequential-workflow-designer-react';
import { EditorProvider } from 'sequential-workflow-editor';
import { DesignTabState } from './DesignTabState';

// IMPORTANT: This component must be imported via dynamic import to avoid SSR issues.

export interface DesignTabProps {
  state: DesignTabState;
  onStateChanged: (state: DesignTabState) => void;
}

export default function DesignTab(props: DesignTabProps) {
  const isFirstChange = useRef(true);
  const definitionRef = useRef(props.state.definition.value);

  useEffect(() => {
    definitionRef.current = props.state.definition.value;
  }, [props.state.definition.value]);

  const editor = useMemo(() => {
    const editorProvider = EditorProvider.create<BotDefinition>(BotDefinitionModel, {
      uidGenerator: UidGenerator.next
    });
    return {
      rootEditor: editorProvider.createRootEditorProvider(),
      stepEditor: editorProvider.createStepEditorProvider(),
      rootValidator: editorProvider.createRootValidator(),
      stepValidator: editorProvider.createStepValidator(),
      stepLabelProvider: editorProvider.createStepLabelProvider(),
      toolboxGroups: editorProvider.getToolboxGroups()
    };
  }, []);

  function onChange(definition: WrappedDefinition<BotDefinition>) {
    const isDirty = isFirstChange.current ? props.state.isDirty : true;
    isFirstChange.current = false;
    props.onStateChanged({
      definition,
      isDirty
    });
  }

  return (
    <SequentialWorkflowDesigner
      definition={props.state.definition}
      rootEditor={editor.rootEditor}
      stepEditor={editor.stepEditor}
      validatorConfiguration={{
        root: editor.rootValidator,
        step: editor.stepValidator
      }}
      controlBar={true}
      stepsConfiguration={{
        iconUrlProvider: (_, type) => `/assets/step-icons/${type}.svg`
      }}
      onDefinitionChange={onChange}
      toolboxConfiguration={{
        groups: editor.toolboxGroups,
        labelProvider: editor.stepLabelProvider
      }}
      undoStackSize={20}
    />
  );
}
