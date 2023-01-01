import { useQuery } from 'react-query';

import { checkSignInApi } from '@apis/authApi';
import useUser from '@hooks/useUser';

export default function Authentication() {
  const { setUser } = useUser();

  useQuery('checkSignIn', checkSignInApi, {
    refetchOnWindowFocus: false,
    onSuccess: setUser,
  });

  return null;
}
