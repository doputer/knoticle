import InactiveBookmarkIcon from '@assets/ico_bookmark_black.svg';
import ActiveBookmarkIcon from '@assets/ico_bookmark_grey_filled.svg';
import sampleImage from '@assets/img_sample_thumbnail.jpg';
import useBookmark from '@hooks/useBookmark';
import { IBookScraps } from '@interfaces';
import { TextLarge, TextXSmall, TextSmall } from '@styles/common';
import { FlexSpaceBetween } from '@styles/layout';

import {
  BookWrapper,
  BookInfoContainer,
  BookTitle,
  Bookmark,
  BookContentsInfo,
  BookContents,
  BookThumbnail,
  ArticleLink,
  AuthorLink,
  BookmarkIcon,
  BookLink,
} from './styled';

interface BookProps {
  book: IBookScraps;
}

export default function Book({ book }: BookProps) {
  const { id, title, user, scraps } = book;
  const { handleBookmarkClick, curBookmarkCnt, curBookmarkId } = useBookmark(book);

  return (
    // 수정모드일때만 아래 onclick이 실행되도록 수정해야함 -> 민형님 작업 후
    <BookWrapper>
      <BookLink
        isarticleexists={scraps[0] ? 'true' : 'false'}
        href={scraps[0] ? `/viewer/${id}/${scraps[0].article.id}` : ``}
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
              href={scraps[0] ? `/viewer/${id}/${scraps[0].article.id}` : ``}
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
                  <ArticleLink key={scrap.article.id} href={`/viewer/${id}/${scrap.article.id}`}>
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
