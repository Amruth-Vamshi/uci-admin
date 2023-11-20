import { UidGenerator } from '@/lib/core/UidGenerator';
import { BotJSON } from '@/lib/repositories/bot/BotJSON';
import { BotValidator } from '@/lib/repositories/bot/BotValidator';

export interface OverviewTabState {
  name: string;
  url: string;
  description: string;
  isDirty: boolean;
  errors: OverviewTabErrors | undefined;
}

export interface OverviewTabErrors {
  nameError: string | undefined;
  urlError: string | undefined;
}

export function createOverviewTabState(bot: BotJSON | undefined): OverviewTabState {
  const value = {
    name: bot?.name ?? '',
    url: bot?.url ?? createDefaultUrl(),
    description: bot?.description ?? ''
  };
  return {
    ...value,
    isDirty: false,
    errors: validateOverviewTabState(value)
  };
}

function createDefaultUrl(): string {
  return UidGenerator.next().substring(0, 8);
}

export function validateOverviewTabState(state: Omit<OverviewTabState, 'isDirty' | 'errors'>): OverviewTabErrors | undefined {
  let nameError: string | undefined = undefined;
  try {
    BotValidator.validName(state.name);
  } catch (e) {
    nameError = (e as Error).message;
  }

  let urlError: string | undefined = undefined;
  try {
    BotValidator.validUrl(state.url);
  } catch (e) {
    urlError = (e as Error).message;
  }

  if (nameError || urlError) {
    return { nameError, urlError };
  }
  return undefined;
}
