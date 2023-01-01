import { atom } from 'recoil';

export interface SignInUser {
  id: number;
  nickname: string;
  profile_image: string;
}

const signInUserState = atom<SignInUser>({
  key: 'signInUserState',
  default: {
    id: 0,
    nickname: '',
    profile_image: '',
  },
});

export default signInUserState;
