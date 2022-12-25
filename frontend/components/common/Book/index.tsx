import Link from 'next/link';

import InactiveBookmarkIcon from '@assets/ico_bookmark_black.svg';
import ActiveBookmarkIcon from '@assets/ico_bookmark_grey_filled.svg';
import sampleImage from '@assets/img_sample_thumbnail.jpg';
import useBookmark from '@hooks/useBookmark';
import { IBookScraps } from '@interfaces';
import { TextSmall, TextXSmall } from '@styles/common';
import { Ellipsis } from '@styles/layout';
import encodeURL from '@utils/encode-url';

import IconButton from '../IconButton';
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
          src={book.thumbnail_image || sampleImage}
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
              src={curBookmarkId ? ActiveBookmarkIcon : InactiveBookmarkIcon}
              alt="Bookmark Icon"
              onClick={handleBookmarkClick}
            />
            <TextXSmall>{curBookmarkCnt}</TextXSmall>
          </Bookmark>
        </BookInformation>

        <BookScrapList>
          <TextSmall>Contents</TextSmall>
          <BookScrap>
            {scraps.slice(0, 4).map((scrap) => (
              <Link
                key={scrap.id}
                href={`/@${user.nickname}/${encodeURL(title, scrap.article.title)}`}
              >
                <Ellipsis>
                  {scrap.order}. {scrap.article.title}
                </Ellipsis>
              </Link>
            ))}
          </BookScrap>
        </BookScrapList>
      </BookBody>
    </BookContainer>
  );
}
