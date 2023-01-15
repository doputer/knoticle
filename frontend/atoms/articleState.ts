import { atom } from 'recoil';

interface ArticleType {
  id: number;
  title: string;
  content: string;
  mode: 'CREATE' | 'UPDATE' | 'SCRAP';
}

const articleState = atom<ArticleType>({
  key: 'articleState',
  default: {
    id: 0,
    title: '',
    content: '',
    mode: 'CREATE',
  },
});

export default articleState;
