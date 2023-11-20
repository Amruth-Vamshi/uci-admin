import { CreateBotRequest } from '@/lib/apiClient/CreateBotRequest';
import { Bot } from '@/lib/repositories/bot/Bot';
import { storage } from '@/lib/repositories/storage';
import { NextResponse } from 'next/server';

export async function GET() {
  const bots = await storage.bot.getAll();

  return NextResponse.json({ bots });
}

export async function POST(req: Request) {
  const request = (await req.json()) as CreateBotRequest;

  const newbot = Bot.create(request.name, request.url, request.description, request.definition);
  await storage.bot.insert(newbot);

  return NextResponse.json({ id: newbot.id });
}
