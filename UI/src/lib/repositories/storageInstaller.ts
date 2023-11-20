import { botTemplates } from '../workflows/bot/templates/botTemplates';
import { Bot } from './bot/Bot';
import { Storage } from './storage';

export async function setup(storage: Storage): Promise<void> {
  // Delete the bellow code to remove the auto installation of the bot templates.

  await Promise.all(
    botTemplates.map(template => {
      const t = template();
      const bot = Bot.create(t.name, t.url, t.description, JSON.parse(t.definition));
      return storage.bot.insert(bot);
    })
  );
}
