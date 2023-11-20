import { BotValidator } from './BotValidator';
import { BotJSON } from './BotJSON';
import { BotDefinition } from '@/lib/workflows/bot/model/BotDefinition';
import { StorageIdGenerator } from '../StorageIdGenerator';

export class Bot {
  public static create(name: string, url: string, description: string, definition: BotDefinition): Bot {
    BotValidator.validName(name);
    BotValidator.validUrl(url);
    BotValidator.validateDescription(description);
    BotValidator.validDefinition(definition);
    const id = StorageIdGenerator.next();
    return new Bot(id, name, url, description, definition);
  }

  public static fromJSON(json: BotJSON): Bot {
    return new Bot(json.id, json.name, json.url, json.description, JSON.parse(json.definition));
  }

  private constructor(
    public readonly id: string,
    public name: string,
    public url: string,
    public description: string,
    public definition: BotDefinition
  ) {}

  public setName(name: string) {
    BotValidator.validName(name);
    this.name = name;
  }

  public setUrl(url: string) {
    BotValidator.validUrl(url);
    this.url = url;
  }

  public setDescription(description: string) {
    BotValidator.validateDescription(description);
    this.description = description;
  }

  public setDefinition(definition: BotDefinition) {
    BotValidator.validDefinition(definition);
    this.definition = definition;
  }

  public toJSON(): BotJSON {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      description: this.description,
      definition: JSON.stringify(this.definition)
    };
  }
}
