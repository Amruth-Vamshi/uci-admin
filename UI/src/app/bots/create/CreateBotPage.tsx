'use client';

import { BotEditor } from '@/components/bot/editor/BotEditor';
import { ApiClient } from '@/lib/apiClient/ApiClient';
import { BotDefinition } from '@/lib/workflows/bot/model/BotDefinition';
import { useRouter } from 'next/navigation';

export function CreatebotPage() {
  const router = useRouter();

  function onModeChanged(modeId: string) {
    if (modeId === 'test') {
      alert('To test an bot you must first save it');
    }
  }

  async function onSave(name: string, url: string, description: string, definition: BotDefinition) {
    const id = await ApiClient.createbot({
      name,
      url,
      description,
      definition
    });

    router.push(`/bots/${id}/edit`);
  }

  return <BotEditor onModeChanged={onModeChanged} onSave={onSave} />;
}
