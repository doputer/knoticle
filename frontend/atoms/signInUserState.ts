import { atom, selector } from 'recoil';

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

export const isSignInUserState = selector({
  key: 'isSignInUserState',
  get: ({ get }) => {
    const signInUser = get(signInUserState);

    return signInUser.id !== 0;
  },
});

export default signInUserState;
