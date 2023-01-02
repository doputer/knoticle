import Link from 'next/link';

import BookmarkIcon from '@assets/ico_bookmark.svg';
import BookmarkFillIcon from '@assets/ico_bookmark_fill.svg';
import DoubleLeftIcon from '@assets/ico_double_arrow_left.svg';
import DoubleRightIcon from '@assets/ico_double_arrow_right.svg';
import IconButton from '@components/common/IconButton';
import useBookmark from '@hooks/useBookmark';
import { IArticleBook, IBookScraps } from '@interfaces';
import { TextMedium, TextSmall } from '@styles/common';
import encodeURL from '@utils/encode-url';

import {
  ArticleNavigation,
  BookmarkButton,
  NavigationItem,
  NavigationTitle,
  ProfileImage,
  ProfileLabel,
  SidebarContainer,
  SidebarFooter,
  SidebarHeader,
  SidebarOpenButton,
  SidebarTitle,
} from './styled';

interface SidebarProps {
  book: IBookScraps;
  article: IArticleBook;
  isOpen: boolean;
  handleSideBarToggle: () => void;
}

export default function Sidebar({ book, article, isOpen, handleSideBarToggle }: SidebarProps) {
  const { title, user, scraps } = book;
  const { id: articleId } = article;

  const { handleBookmarkClick, curBookmarkCnt, curBookmarkId } = useBookmark(book);

  return (
    <>
      <SidebarContainer className={isOpen ? 'show' : 'hide'}>
        <SidebarHeader>
          <BookmarkButton onClick={handleBookmarkClick}>
            {curBookmarkId ? <BookmarkFillIcon /> : <BookmarkIcon />}
            <TextSmall>{curBookmarkCnt}</TextSmall>
          </BookmarkButton>
          <IconButton icon={<DoubleLeftIcon />} onClick={handleSideBarToggle} />
        </SidebarHeader>

        <SidebarTitle>{title}</SidebarTitle>

        <ArticleNavigation>
          <NavigationTitle>목차</NavigationTitle>
          {scraps.map((scrap) => {
            return scrap.article.id === articleId ? (
              <NavigationItem key={scrap.id} current>
                {scrap.order}. {scrap.article.title}
              </NavigationItem>
            ) : (
              <Link
                key={scrap.id}
                href={`/@${user.nickname}/${encodeURL(book.title, scrap.article.title)}`}
              >
                <NavigationItem current={false}>
                  {scrap.order}. {scrap.article.title}
                </NavigationItem>
              </Link>
            );
          })}
        </ArticleNavigation>

        <SidebarFooter href={`/@${user.nickname}`}>
          <ProfileLabel>
            <TextSmall>Knotted by</TextSmall>
            <TextMedium>{user.nickname}</TextMedium>
          </ProfileLabel>
          <ProfileImage src={user.profile_image} width={70} height={70} alt="Profile Image" />
        </SidebarFooter>
      </SidebarContainer>

      {!isOpen && (
        <SidebarOpenButton onClick={handleSideBarToggle}>
          <DoubleRightIcon />
        </SidebarOpenButton>
      )}
    </>
  );
}
