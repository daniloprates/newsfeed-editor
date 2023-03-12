export type Screen =
  | 'LIST'
  | 'EDIT';

export type DaedalusItemType =
  | 'incident'
  | 'alert'
  | 'announcement'
  | 'info'
  | 'software-update';

export type Platform =
  | 'darwin'
  | 'win32'
  | 'linux';

export interface DaedalusSchema {
  updatedAt: number,
  items: DaedalusItemSchema[]
};

export type Language =
    | 'en-US'
    | 'ja-JP';

export type MultiLanguageObj  = {
  [key in Language]: string
};

export interface DaedalusItemSchema {
    title: MultiLanguageObj,
    content: MultiLanguageObj,
    target: {
      'daedalusVersion': string,
      'platforms': Platform[]
    },
    action: {
      label: MultiLanguageObj,
      url: MultiLanguageObj
    },
    date: number,
    type: string,
    softwareUpdate?: {
      [key in Platform]: {
        version: string,
        hash: string,
        url: string,
      }
    }
};
