'use client';

import { BotTester } from '@/components/bot/tester/BotTester';
import { BotJSON } from '@/lib/repositories/bot/BotJSON';
import { useRouter } from 'next/navigation';

export interface TestBotPageProps {
  id: string;
  bot: BotJSON;
}

export function TestBotPage(props: TestBotPageProps) {
  const router = useRouter();

  function onModeChanged(modeId: string) {
    if (modeId === 'edit') {
      router.push(`/bots/${props.id}/edit`);
    }
  }

  return <BotTester id={props.id} bot={props.bot} onModeChanged={onModeChanged} />;
}
