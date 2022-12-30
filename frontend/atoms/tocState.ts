import { atom } from 'recoil';

export interface TOC {
  id: string;
  text: string;
  offsetTop: number;
}

export const tocState = atom<TOC[]>({
  key: 'tocState',
  default: [],
});

export const activeTocState = atom({
  key: 'activeTocState',
  default: '',
});
