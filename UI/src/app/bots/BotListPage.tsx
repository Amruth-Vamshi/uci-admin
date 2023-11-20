'use client';

import { BotList } from '@/components/theme/botList/BotList';
import { ApiClient } from '@/lib/apiClient/ApiClient';
import { BotJSON } from '@/lib/repositories/bot/BotJSON';
import { useRouter } from 'next/navigation';

export interface BotListPageProps {
  bots: BotJSON[];
}

export async function BotListPage(props: BotListPageProps) {
  const router = useRouter();

  const bots = props.bots.map(e => ({
    id: e.id,
    name: e.name,
    method: 'POST',
    url: `/api/functions/${e.url}`,
    editUrl: `/bots/${e.id}/edit`,
    testUrl: `/bots/${e.id}/test`
  }));

  async function onDeleteClicked(id: string) {
    if (!confirm('Are you sure?')) {
      return;
    }

    await ApiClient.deletebot(id);
    router.refresh();
  }

  return <BotList bots={bots} createUrl="/bots/create" onDeleteClicked={onDeleteClicked} />;
}
