import { useQuery } from 'react-query';

import { useSetRecoilState } from 'recoil';

import { checkSignInApi } from '@apis/authApi';
import signInUserState from '@atoms/signInUserState';

export default function Authentication() {
  const setSignInUser = useSetRecoilState(signInUserState);

  useQuery('checkSignIn', checkSignInApi, {
    refetchOnWindowFocus: false,
    onSuccess: (user) => {
      setSignInUser(user);
    },
  });

  return null;
}
