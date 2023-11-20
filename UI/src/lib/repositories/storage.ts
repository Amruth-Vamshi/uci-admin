import { BotRepository } from './bot/BotRepository';
import { MemoryBotRepository } from './bot/MemoryBotRepository';
import { MongoBotRepository } from './bot/MongoBotRepository';
import { MongoProvider } from './MongoProvider';

export interface Storage {
  bot: BotRepository;
}

function getStorage(): Storage {
  const type = process.env.STORAGE_TYPE || 'memory';
  switch (type) {
    case 'memory':
      return {
        bot: new MemoryBotRepository()
      };
    case 'mongodb': {
      const provider = MongoProvider.create();
      return {
        bot: new MongoBotRepository(provider)
      };
    }
    default:
      throw new Error(`Unknown storage type: ${type}`);
  }
}

export const storage = getStorage();
