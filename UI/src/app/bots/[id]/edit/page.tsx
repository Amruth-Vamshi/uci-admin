import { storage } from '@/lib/repositories/storage';
import { EditBotPage } from './EditBotPage';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import NotFound from '@/app/not-found';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit bot'
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page(props: PageProps) {
  const data = await getData(props.params.id);

  if (!data.bot) {
    return <NotFound />;
  }
  return (
    <DefaultLayout>
      <EditBotPage id={props.params.id} bot={data.bot} />
    </DefaultLayout>
  );
}

async function getData(id: string) {
  const bot = await storage.bot.tryGetById(id);
  return {
    bot: bot ? bot.toJSON() : null
  };
}
