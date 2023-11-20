import { BotDefinition } from '../workflows/bot/model/BotDefinition';

export interface UpdateBotRequest {
  name: string;
  url: string;
  description: string;
  definition: BotDefinition;
}
