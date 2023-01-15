import { atom } from 'recoil';

const articleBufferState = atom({
  key: 'articleBufferState',
  default: {
    title: '',
    content: '',
  },
});

export default articleBufferState;
