export type Screen =
  | 'LIST'
  | 'IMPORT'
  | 'EDIT';

export type Platform =
  | 'darwin'
  | 'win32'
  | 'linux';

export type Language =
    | 'en-US'
    | 'ja-JP';

export type MultiLanguageObj  = {
  [key in Language]: string
};

export type DaedalusItemType =
  | 'incident'
  | 'alert'
  | 'announcement'
  | 'info'
  | 'software-update';

export interface DaedalusItemSchema {
    title: MultiLanguageObj,
    content: MultiLanguageObj,
    target: {
      'daedalusVersion': string,
      'platforms': Platform[],
    },
    action: {
      label: MultiLanguageObj,
      url: MultiLanguageObj
    },
    date: number,
    type: DaedalusItemType,
    softwareUpdate?: {
      [key in Platform]: {
        version: string,
        hash: string,
        url: string,
      }
    }
};

export interface DaedalusSchema {
  updatedAt: number,
  items: DaedalusItemSchema[],
};
