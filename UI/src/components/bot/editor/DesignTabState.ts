import { BotDefinition } from '@/lib/workflows/bot/model/BotDefinition';
import { WrappedDefinition } from 'sequential-workflow-designer-react';

export interface DesignTabState {
  definition: WrappedDefinition<BotDefinition>;
  isDirty: boolean;
}

export function createDesignTabState(definition: BotDefinition): DesignTabState {
  return {
    definition: { value: definition } as WrappedDefinition<BotDefinition>,
    isDirty: false
  };
}
