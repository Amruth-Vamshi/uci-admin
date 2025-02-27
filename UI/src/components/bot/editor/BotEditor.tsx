'use client';

import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';
import { BotTab, BotTabHost } from '../../theme/bot/BotTabHost';
import { OverviewTab } from './OverviewTab';
import { DesignTabState, createDesignTabState } from './DesignTabState';
import { StartDefinitionActivator } from '../StartDefinitionActivator';
import { OverviewTabState, createOverviewTabState } from './OverviewTabState';
import { createbotModes } from '../botModes';
import { BotJSON } from '@/lib/repositories/bot/BotJSON';
import { BotDefinition } from '@/lib/workflows/bot/model/BotDefinition';

const DesignTab = dynamic(() => import('./DesignTab'), { ssr: false });

export interface BotEditorProps {
  bot?: BotJSON;
  onSave: (name: string, url: string, description: string, definition: BotDefinition) => Promise<void>;
  onModeChanged: (modeId: string, isDirty: boolean) => void;
}

interface BotEditorState {
  overview: OverviewTabState;
  design: DesignTabState;
}

export function BotEditor(props: BotEditorProps) {
  const isSaving = useRef(false);
  const [state, setState] = useState<BotEditorState>(() => ({
    overview: createOverviewTabState(props.bot),
    design: createDesignTabState(
      props.bot?.definition ? JSON.parse(props.bot.definition) : StartDefinitionActivator.createDefault()
    )
  }));

  const isNewMode = !props.bot;
  const isDirty = state.design.isDirty || state.overview.isDirty;
  const isValid = (state.design.definition.isValid ?? true) && !state.overview.errors;
  const canSave = isDirty && isValid;

  const modes = useMemo(() => createbotModes('edit', isNewMode), [isNewMode]);
  const [currentTab, setCurrentTab] = useState<string>(isNewMode ? 'overview' : 'design');
  const tabs = useMemo<BotTab[]>(
    () => [
      {
        label: 'Overview',
        isDirty: state.overview.isDirty,
        isValid: !state.overview.errors,
        isSelected: currentTab === 'overview'
      },
      {
        label: 'Design',
        isDirty: state.design.isDirty,
        isValid: state.design.definition.isValid ?? true,
        isSelected: currentTab === 'design'
      }
    ],
    [currentTab, state.design.isDirty, state.design.definition.isValid, state.overview.errors, state.overview.isDirty]
  );

  function onModeChanged(index: number) {
    if (props.onModeChanged) {
      props.onModeChanged(modes[index].id, isDirty);
    }
  }

  function onTabClicked(index: number) {
    setCurrentTab(index === 0 ? 'overview' : 'design');
  }

  function onOverviewStateChanged(overview: OverviewTabState) {
    setState({ ...state, overview });
  }

  function onDesignStateChange(design: DesignTabState) {
    setState({ ...state, design });
  }

  async function onSaveClicked() {
    if (isSaving.current || !canSave) {
      return;
    }
    isSaving.current = true;

    try {
      await props.onSave(state.overview.name, state.overview.url, state.overview.description, state.design.definition.value);
      setState({
        design: {
          ...state.design,
          isDirty: false
        },
        overview: {
          ...state.overview,
          isDirty: false
        }
      });
    } finally {
      isSaving.current = false;
    }
  }

  return (
    <BotTabHost
      name={state.overview.name}
      modes={modes}
      onModeChanged={onModeChanged}
      tabs={tabs}
      onTabClicked={onTabClicked}
      primaryButtonLabel="Save"
      isPrimaryButtonDisabled={!canSave}
      onPrimaryButtonClicked={onSaveClicked}
    >
      {currentTab === 'overview' && <OverviewTab state={state.overview} onStateChanged={onOverviewStateChanged} />}
      {currentTab === 'design' && <DesignTab state={state.design} onStateChanged={onDesignStateChange} />}
    </BotTabHost>
  );
}
