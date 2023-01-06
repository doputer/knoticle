import Link from 'next/link';

import BookmarkIcon from '@assets/ico_bookmark.svg';
import BookmarkFillIcon from '@assets/ico_bookmark_fill.svg';
import IconButton from '@components/common/IconButton';
import useBookmark from '@hooks/useBookmark';
import { IBookScraps } from '@interfaces';
import { TextSmall, TextXSmall } from '@styles/common';
import { Ellipsis } from '@styles/layout';
import encodeURL from '@utils/encode-url';

import {
  BookAuthor,
  BookBody,
  BookContainer,
  BookDescription,
  BookInformation,
  Bookmark,
  BookScrap,
  BookScrapList,
  BookThumbnail,
  BookTitle,
} from './styled';

interface BookProps {
  book: IBookScraps;
}

export default function Book({ book }: BookProps) {
  const { title, user, scraps } = book;
  const { handleBookmarkClick, curBookmarkCnt, curBookmarkId } = useBookmark(book);

  return (
    <BookContainer>
      <Link
        href={scraps[0] ? `/@${user.nickname}/${encodeURL(title, scraps[0].article.title)}` : ``}
      >
        <BookThumbnail
          src={book.thumbnail_image}
          alt="thumbnail"
          width={280}
          height={157.5}
          priority
        />
      </Link>

      <BookBody>
        <BookInformation>
          <BookDescription>
            <BookTitle>
              <Link
                href={
                  scraps[0] ? `/@${user.nickname}/${encodeURL(title, scraps[0].article.title)}` : ``
                }
              >
                <Ellipsis>{title}</Ellipsis>
              </Link>
            </BookTitle>
            <BookAuthor>
              <Link href={`/@${user.nickname}`}>by {user.nickname}</Link>
            </BookAuthor>
          </BookDescription>
          <Bookmark>
            <IconButton
              icon={curBookmarkId ? <BookmarkFillIcon /> : <BookmarkIcon />}
              onClick={handleBookmarkClick}
            />
            <TextXSmall>{curBookmarkCnt}</TextXSmall>
          </Bookmark>
        </BookInformation>

        <BookScrapList>
          <TextSmall>Contents</TextSmall>
          <BookScrap>
            {scraps.slice(0, 4).map((scrap, index) => (
              <Link
                key={scrap.id}
                href={`/@${user.nickname}/${encodeURL(title, scrap.article.title)}`}
              >
                <Ellipsis>
                  {index + 1}. {scrap.article.title}
                </Ellipsis>
              </Link>
            ))}
          </BookScrap>
        </BookScrapList>
      </BookBody>
    </BookContainer>
  );
}
