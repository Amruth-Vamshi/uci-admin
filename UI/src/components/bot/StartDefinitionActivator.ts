import { UidGenerator } from '@/lib/core/UidGenerator';
import { BotDefinition } from '@/lib/workflows/bot/model/BotDefinition';
import { BotDefinitionModel } from '@/lib/workflows/bot/model/botDefinitionModel';
import { ModelActivator } from 'sequential-workflow-editor-model';

export class StartDefinitionActivator {
  public static createDefault(): BotDefinition {
    const activator = ModelActivator.create(BotDefinitionModel, UidGenerator.next);
    return activator.activateDefinition();
  }
}
