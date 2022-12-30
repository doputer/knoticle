import Image from 'next/image';
import Link from 'next/link';

import Bookmark from '@assets/ico_bookmark.svg';
import BookmarkFilled from '@assets/ico_bookmark_white_filled.svg';
import HideIcon from '@assets/ico_hide.svg';
import OpenIcon from '@assets/ico_open.svg';
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
            <Image src={curBookmarkId ? BookmarkFilled : Bookmark} alt="Bookmark Icon" />
            <TextSmall>{curBookmarkCnt}</TextSmall>
          </BookmarkButton>
          <IconButton src={HideIcon} alt="Closed Sidebar Icon" onClick={handleSideBarToggle} />
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
              <NavigationItem key={scrap.id} current={false}>
                <Link href={`/@${user.nickname}/${encodeURL(book.title, scrap.article.title)}`}>
                  {scrap.order}. {scrap.article.title}
                </Link>
              </NavigationItem>
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
          <Image src={OpenIcon} alt="Open Icon" />
        </SidebarOpenButton>
      )}
    </>
  );
}
