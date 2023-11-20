import { Collection, ObjectId } from 'mongodb';
import { MongoProvider } from '../MongoProvider';
import { Bot } from './Bot';
import { BotJSON } from './BotJSON';
import { BotRepository } from './BotRepository';

interface Mongobot extends Omit<BotJSON, 'id'> {
  _id: ObjectId;
  id?: string;
}

export class MongoBotRepository implements BotRepository {
  public constructor(private readonly provider: MongoProvider) {}

  public async insert(bot: Bot): Promise<void> {
    const collection = await this.getCollection();
    await collection.insertOne(toMongo(bot));
  }

  public async update(bot: Bot): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
      {
        _id: toId(bot.id)
      },
      {
        $set: toMongo(bot)
      }
    );
  }

  public async tryDeleteById(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({
      _id: toId(id)
    });
    return result.deletedCount === 1;
  }

  public async getAll(): Promise<Bot[]> {
    const collection = await this.getCollection();
    const result = await collection.find().toArray();
    return result.map(fromMongo);
  }

  public async tryGetById(id: string): Promise<Bot | null> {
    const collection = await this.getCollection();
    const result = await collection.findOne({
      _id: toId(id)
    });
    return result ? fromMongo(result) : null;
  }

  public async tryGetByUrl(url: string): Promise<Bot | null> {
    const collection = await this.getCollection();
    const result = await collection.findOne({
      url
    });
    return result ? fromMongo(result) : null;
  }

  private async getCollection(): Promise<Collection<Mongobot>> {
    return (await this.provider.getDb()).collection('bots');
  }
}

function toId(id: string): ObjectId {
  return new ObjectId(id);
}

function toMongo(bot: Bot): Mongobot {
  const item: Mongobot = {
    ...bot.toJSON(),
    _id: toId(bot.id)
  };
  delete item.id;
  return item;
}

function fromMongo(bot: Mongobot): Bot {
  return Bot.fromJSON({
    ...bot,
    id: bot._id.toHexString()
  });
}
