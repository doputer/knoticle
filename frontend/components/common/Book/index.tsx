import InactiveBookmarkIcon from '@assets/ico_bookmark_black.svg';
import ActiveBookmarkIcon from '@assets/ico_bookmark_grey_filled.svg';
import sampleImage from '@assets/img_sample_thumbnail.jpg';
import useBookmark from '@hooks/useBookmark';
import { IBookScraps } from '@interfaces';
import { TextLarge, TextSmall, TextXSmall } from '@styles/common';
import { FlexSpaceBetween } from '@styles/layout';
import encodeURL from '@utils/encode-url';

import {
  ArticleLink,
  AuthorLink,
  BookContents,
  BookContentsInfo,
  BookInfoContainer,
  BookLink,
  Bookmark,
  BookmarkIcon,
  BookThumbnail,
  BookTitle,
  BookWrapper,
} from './styled';

interface BookProps {
  book: IBookScraps;
}

export default function Book({ book }: BookProps) {
  const { title, user, scraps } = book;
  const { handleBookmarkClick, curBookmarkCnt, curBookmarkId } = useBookmark(book);

  return (
    // 수정모드일때만 아래 onclick이 실행되도록 수정해야함 -> 민형님 작업 후
    <BookWrapper>
      <BookLink
        isarticleexists={scraps[0] ? 'true' : 'false'}
        href={scraps[0] ? `/@${user.nickname}/${encodeURL(title, scraps[0].article.title)}` : ``}
      >
        <BookThumbnail
          src={book.thumbnail_image || sampleImage}
          alt="thumbnail"
          width={280}
          height={200}
        />
      </BookLink>

      <BookInfoContainer>
        <FlexSpaceBetween>
          <BookTitle>
            <BookLink
              isarticleexists={scraps[0] ? 'true' : 'false'}
              href={
                scraps[0] ? `/@${user.nickname}/${encodeURL(title, scraps[0].article.title)}` : ``
              }
            >
              <TextLarge>{title}</TextLarge>
            </BookLink>
            <AuthorLink href={`/@${user.nickname}`}>by {user.nickname}</AuthorLink>
          </BookTitle>
          <Bookmark>
            <BookmarkIcon
              src={curBookmarkId ? ActiveBookmarkIcon : InactiveBookmarkIcon}
              alt="Bookmark Icon"
              onClick={handleBookmarkClick}
            />
            <TextXSmall>{curBookmarkCnt}</TextXSmall>
          </Bookmark>
        </FlexSpaceBetween>

        <BookContentsInfo>
          <TextSmall>Contents</TextSmall>
          <BookContents>
            {scraps.map(
              (scrap, idx) =>
                idx < 4 && (
                  <ArticleLink
                    key={scrap.article.id}
                    href={
                      scraps[0]
                        ? `/@${user.nickname}/${encodeURL(title, scraps[0].article.title)}`
                        : ``
                    }
                  >
                    <span>
                      {idx + 1}. {scrap.article.title}
                    </span>
                  </ArticleLink>
                )
            )}
          </BookContents>
        </BookContentsInfo>
        {/* {scraps.length > 4 && (
          <FlexCenter>
            <Image src={MoreContentsIcon} alt="More Contents Icon" width={12} height={12} />
          </FlexCenter>
        )} */}
      </BookInfoContainer>
    </BookWrapper>
  );
}
