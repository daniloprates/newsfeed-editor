import type { Screen, DaedalusItemSchema } from './types';

export const SCREENS: Record<string, Screen> = {
  LIST: 'LIST',
  IMPORT: 'IMPORT',
  EDIT: 'EDIT',
};

export const emptyItem: DaedalusItemSchema = {
  title: {
    'en-US': '',
    'ja-JP': '',
  },
  content: {
    'en-US': '',
    'ja-JP': '',
  },
  target: {
    'daedalusVersion': '',
    'platforms': ["darwin","win32","linux"]
  },
  action: {
    label: {
    'en-US': '',
    'ja-JP': '',
  },
    url: {
    'en-US': '',
    'ja-JP': '',
  }
  },
  type: 'announcement',
  date: 0,
};

