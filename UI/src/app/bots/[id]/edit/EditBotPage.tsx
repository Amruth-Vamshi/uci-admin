'use client';

import { BotEditor } from '@/components/bot/editor/BotEditor';
import { ApiClient } from '@/lib/apiClient/ApiClient';
import { BotJSON } from '@/lib/repositories/bot/BotJSON';
import { BotDefinition } from '@/lib/workflows/bot/model/BotDefinition';
import { useRouter } from 'next/navigation';

export interface EditBotPageProps {
  id: string;
  bot: BotJSON;
}

export function EditBotPage(props: EditBotPageProps) {
  const router = useRouter();

  async function onSave(name: string, url: string, description: string, definition: BotDefinition) {
    console.log("definition",definition)
    await ApiClient.updatebot(props.id, {
      name,
      url,
      description,
      definition
    });
  }

  function onModeChanged(modeId: string, isDirty: boolean) {
    if (modeId === 'test') {
      if (isDirty && !confirm('You have unsaved changes. Are you sure you want to continue?')) {
        return;
      }
      router.push(`/bots/${props.id}/test`);
    }
  }

  return <BotEditor bot={props.bot} onSave={onSave} onModeChanged={onModeChanged} />;
}
