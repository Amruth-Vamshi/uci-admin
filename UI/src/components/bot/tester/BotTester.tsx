'use client';

import { useMemo, useState } from 'react';
import { createbotModes } from '../botModes';
import { BotTab, BotTabHost } from '@/components/theme/bot/BotTabHost';
import { TestTab } from './TestTab';
import { BotJSON } from '@/lib/repositories/bot/BotJSON';
import { createTestTabState } from './TestTabState';
import { BotExecutor } from './BotExecutor';
import { BotDefinition } from '@/lib/workflows/bot/model/BotDefinition';

export interface BotTesterProps {
  id: string;
  bot: BotJSON;
  onModeChanged: (modeId: string) => void;
}

export function BotTester(props: BotTesterProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const definition = useMemo<BotDefinition>(() => JSON.parse(props.bot.definition), [props.bot.definition]);
  const [state, setState] = useState(() => createTestTabState(definition.properties.inputs));
  const isValid = !state.parserResult.errors;

  const modes = useMemo(() => createbotModes('test', false), []);
  const tabs: BotTab[] = useMemo(
    () => [
      {
        label: 'Test',
        isSelected: true,
        isDirty: false,
        isValid
      }
    ],
    [isValid]
  );

  function onModeChanged(index: number) {
    props.onModeChanged(modes[index].id);
  }

  async function onRunClicked() {
    if (!isValid || isExecuting) {
      return;
    }
    setIsExecuting(true);

    let logs: string[] = [];
    const executor = new BotExecutor(message => {
      logs = [...logs, message];
      setState({
        ...state,
        logs
      });
    });
    await executor.execute(props.bot.url, state.parserResult.values);

    setIsExecuting(false);
  }

  return (
    <BotTabHost
      name={props.bot.name}
      modes={modes}
      onModeChanged={onModeChanged}
      tabs={tabs}
      onTabClicked={() => {}}
      primaryButtonLabel="Run"
      isPrimaryButtonDisabled={!isValid || isExecuting}
      onPrimaryButtonClicked={onRunClicked}
    >
      <TestTab
        description={props.bot.description}
        url={props.bot.url}
        inputDefinitions={definition.properties.inputs}
        state={state}
        onStateChanged={setState}
      />
    </BotTabHost>
  );
}
