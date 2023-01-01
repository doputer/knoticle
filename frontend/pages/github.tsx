import { useRouter } from 'next/router';

import { useEffect } from 'react';
import { useMutation } from 'react-query';

import { githubSignInApi } from '@apis/authApi';
import Spinner from '@components/common/Spinner';
import useApiError from '@hooks/useApiError';
import useUser from '@hooks/useUser';
import { FlexColumnCenter, FullPageWrapper } from '@styles/layout';

export default function GitHubPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const { mutate: githubSignIn } = useMutation(githubSignInApi, {
    onError: useApiError,
    onSuccess: (user) => {
      setUser(user);
      router.replace('/');
    },
  });

  useEffect(() => {
    const { code, error } = router.query;

    if (!code || error) {
      router.replace('/');
      return;
    }

    githubSignIn({ code: code as string });
  }, [router.query]);

  return (
    <FullPageWrapper>
      <FlexColumnCenter style={{ height: '100%', backgroundColor: 'var(--white-color)' }}>
        <Spinner style={{ width: 100, height: 100, borderWidth: 16 }} />
        <div style={{ marginTop: '32px' }}>GitHub 로그인 중 입니다.</div>
      </FlexColumnCenter>
    </FullPageWrapper>
  );
}
