import { BotJSON } from '@/lib/repositories/bot/BotJSON';

export type BotTemplate = () => Omit<BotJSON, 'id'>;
