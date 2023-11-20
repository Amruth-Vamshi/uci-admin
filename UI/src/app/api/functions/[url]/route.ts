import { ExecuteBotResponse } from '@/lib/apiClient/ExecuteBotResponse';
import { BotWorkflowMachine } from '@/lib/workflows/bot/machine/BotWorkflowMachine';
import { storage } from '@/lib/repositories/storage';
import { NextResponse } from 'next/server';

export async function POST(req: Request, props: { params: { url: string } }) {
  const body = await req.text();
  const inputs = body ? JSON.parse(body) : Object.fromEntries(new URL(req.url).searchParams);

  const bot = await storage.bot.tryGetByUrl(props.params.url);
  if (!bot) {
    return NextResponse.json('bot not found', {
      status: 404
    });
  }

  const machine = BotWorkflowMachine.create(bot.definition, inputs);
  machine.start();

  try {
    await machine.wait();

    const response: ExecuteBotResponse = {
      __logs: machine.readLogs(),
      ...machine.readOutputs()
    };
    return NextResponse.json(response);
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Internal error';
    return NextResponse.json(error, {
      status: 500
    });
  }
}
