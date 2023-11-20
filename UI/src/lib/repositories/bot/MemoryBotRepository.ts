import { Bot } from './Bot';
import { BotJSON } from './BotJSON';
import { BotRepository } from './BotRepository';

declare global {
  var botCollection: BotJSON[] | undefined;
}

function getCollection(): BotJSON[] {
  return global.botCollection || (global.botCollection = []);
}

export class MemoryBotRepository implements BotRepository {
  public async insert(bot: Bot): Promise<void> {
    getCollection().push(bot.toJSON());
  }

  public async update(bot: Bot): Promise<void> {
    const collection = getCollection();
    const index = collection.findIndex(e => e.id === bot.id);
    if (index < 0) {
      throw new Error(`Cannot find bot id: ${bot.id}`);
    }
    collection.splice(index, 1);
    collection.push(bot.toJSON());
  }

  public async tryDeleteById(id: string): Promise<boolean> {
    const collection = getCollection();
    const index = collection.findIndex(e => e.id === id);
    if (index < 0) {
      return false;
    }
    collection.splice(index, 1);
    return true;
  }

  public async getAll(): Promise<Bot[]> {
    return getCollection().map(Bot.fromJSON);
  }

  public async tryGetById(id: string): Promise<Bot | null> {
    const item = getCollection().find(bot => bot.id === id);
    return item ? Bot.fromJSON(item) : null;
  }

  public async tryGetByUrl(url: string): Promise<Bot | null> {
    const item = getCollection().find(bot => bot.url === url);
    return item ? Bot.fromJSON(item) : null;
  }
}
