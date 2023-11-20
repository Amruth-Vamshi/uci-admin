import { BotTabHostMode } from '../theme/bot/BotTabHost';

export type botMode = 'edit' | 'test';

export function createbotModes(current: botMode, isNewMode: boolean): BotTabHostMode[] {
  return [
    {
      id: 'edit',
      label: isNewMode ? 'Create' : 'Edit',
      isSelected: current === 'edit'
    },
    {
      id: 'test',
      label: 'Test',
      isSelected: current === 'test'
    }
  ];
}
