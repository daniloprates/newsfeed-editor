import type { Screen, Confirmation } from './types';

export const SCREENS: Record<string, Screen> = {
  LIST: 'LIST',
  IMPORT: 'IMPORT',
  EDIT: 'EDIT',
};

export const CONFIRMATIONS: Record<string, Confirmation> = {
  CANCEL: 'CANCEL',
  SUBMIT: 'SUBMIT',
}
