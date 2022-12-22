import { GetServerSidePropsContext } from 'next';
import { getServerSideSitemap } from 'next-sitemap';

import { getScrapsApi } from '@apis/scrapApi';
import { IArticleBook } from '@interfaces';
import encodeURL from '@utils/encode-url';

export default function SiteMapXML() {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const scraps = await getScrapsApi();

  const lastmod = new Date().toISOString();

  const defaultFields = [
    {
      loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
      changefreq: 'daily',
      priority: '1.0',
      lastmod,
    },
  ];

  const scrapFields = scraps.map((scrap: { article: IArticleBook }) => ({
    loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}/@${scrap.article.book.user.nickname}/${encodeURL(
      scrap.article.book.title,
      scrap.article.title
    )}`,
    changefreq: 'daily',
    priority: '1.0',
    lastmod,
  }));

  const fields = [...defaultFields, ...scrapFields];

  return getServerSideSitemap(context, fields);
};
