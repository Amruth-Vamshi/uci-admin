import { storage } from '@/lib/repositories/storage';
import { setup } from '@/lib/repositories/storageInstaller';
import { BotListPage } from './BotListPage';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bots'
};

export default async function Page() {
  const data = await getData();

  return (
    <DefaultLayout>
      <BotListPage bots={data.bots} />
    </DefaultLayout>
  );
}

async function getData() {
  let bots = await storage.bot.getAll();
  if (bots.length === 0) {
    await setup(storage);
    bots = await storage.bot.getAll();
  }

  return {
    bots: bots.map((e:any) => e.toJSON())
  };
}
