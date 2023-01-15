import { useRouter } from 'next/router';

import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { useSetRecoilState } from 'recoil';

import { getArticleApi } from '@apis/articleApi';
import articleBufferState from '@atoms/articleBufferState';
import articleState from '@atoms/articleState';
import Editor from '@components/write/Editor';
import Preview from '@components/write/Preview';
import WriteBar from '@components/write/WriteBar';
import WriteHead from '@components/write/WriteHead';
import { IArticle } from '@interfaces';
import { Flex, FlexColumn } from '@styles/layout';

export default function WritePage() {
  const router = useRouter();
  const setBuffer = useSetRecoilState(articleBufferState);
  const setArticle = useSetRecoilState(articleState);
  const { refetch: getArticle } = useQuery(
    ['getArticle'],
    () => getArticleApi(router.query.id as string),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (article: IArticle) => {
        setBuffer({ title: article.title, content: article.content });
        setArticle((prev) => ({ ...prev, id: article.id, mode: 'UPDATE' }));
      },
    }
  );

  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.id) return;

    getArticle();
  }, [router.isReady]);

  return (
    <>
      <WriteHead />
      <Flex>
        <FlexColumn style={{ flex: 1, height: '100vh' }}>
          <Editor />
          <WriteBar />
        </FlexColumn>
        <Preview />
      </Flex>
    </>
  );
}
