import { atom } from 'recoil';

const articleState = atom({
  key: 'articleState',
  default: {
    id: 0,
    title: '',
    content: '',
    book_id: 0,
  },
});

export default articleState;
