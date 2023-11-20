import { UpdateBotRequest } from '@/lib/apiClient/UpdateBotRequest';
import { storage } from '@/lib/repositories/storage';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, props: { params: { id: string } }) {
  const request = (await req.json()) as UpdateBotRequest;

  const bot = await storage.bot.tryGetById(props.params.id);
  if (!bot) {
    return NextResponse.json('bot not found', {
      status: 404
    });
  }

  bot.setName(request.name);
  bot.setUrl(request.url);
  bot.setDescription(request.description);
  bot.setDefinition(request.definition);

  await storage.bot.update(bot);

  return NextResponse.json({});
}

export async function DELETE(_: Request, props: { params: { id: string } }) {
  const success = await storage.bot.tryDeleteById(props.params.id);
  if (success) {
    return NextResponse.json({});
  } else {
    return NextResponse.json('bot not found', {
      status: 404
    });
  }
}
