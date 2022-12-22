import ArticleItem from '@components/search/ArticleItem';
import { IArticleBook } from '@interfaces';
import encodeURL from '@utils/encode-url';
import { getTextAfterLastNewLine, highlightKeyword } from '@utils/highlight-keyword';
import { markdown2text } from '@utils/parser';

interface ArticleListProps {
  articles: IArticleBook[];
  keywords: string[];
}

export default function ArticleList({ articles, keywords }: ArticleListProps) {
  return (
    <>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          title={highlightKeyword(article.title, keywords)}
          content={highlightKeyword(
            getTextAfterLastNewLine(markdown2text(article.content), keywords),
            keywords
          )}
          nickname={article.book.user.nickname}
          profileImage={article.book.user.profile_image}
          articleUrl={`/@${article.book.user.nickname}/${encodeURL(
            article.book.title,
            article.title
          )}`}
          studyUrl={`/@${article.book.user.nickname}`}
        />
      ))}
    </>
  );
}
