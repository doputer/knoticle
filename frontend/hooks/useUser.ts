import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import signInUserState, { isSignInUserState, type SignInUser } from '@atoms/signInUserState';

const useUser = () => {
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);
  const resetSignInUser = useResetRecoilState(signInUserState);
  const isSignInUser = useRecoilValue(isSignInUserState);

  const setUser = (user: SignInUser) => {
    setSignInUser(user);
  };

  const clearUser = () => {
    resetSignInUser();
  };

  return { signInUser, isSignInUser, setUser, clearUser };
};

export default useUser;
