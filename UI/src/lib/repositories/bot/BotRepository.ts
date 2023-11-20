import { Bot } from './Bot';

export interface BotRepository {
  insert(bot: Bot): Promise<void>;
  update(bot: Bot): Promise<void>;
  /**
   * @returns true if the bot was found and deleted, false if the bot was not found.
   */
  tryDeleteById(bot: string): Promise<boolean>;
  getAll(): Promise<Bot[]>;
  tryGetById(id: string): Promise<Bot | null>;
  tryGetByUrl(url: string): Promise<Bot | null>;
}
