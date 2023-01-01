import { useRecoilState, useResetRecoilState } from 'recoil';

import signInUserState, { type SignInUser } from '@atoms/signInUserState';

const useUser = () => {
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);
  const resetSignInUser = useResetRecoilState(signInUserState);

  const setUser = (user: SignInUser) => {
    setSignInUser(user);
  };

  const clearUser = () => {
    resetSignInUser();
  };

  return { signInUser, setUser, clearUser };
};

export default useUser;
