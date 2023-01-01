import { atom } from 'recoil';

interface SignInUserState {
  id: number;
  nickname: string;
  profile_image: string;
}

const signInUserState = atom<SignInUserState>({
  key: 'signInUserState',
  default: {
    id: 0,
    nickname: '',
    profile_image: '',
  },
});

export default signInUserState;
