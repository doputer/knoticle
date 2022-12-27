import Image from 'next/image';

import { useState } from 'react';

import Bookmark from '@assets/ico_bookmark.svg';
import BookmarkFilled from '@assets/ico_bookmark_white_filled.svg';
import HideIcon from '@assets/ico_hide.svg';
import OpenIcon from '@assets/ico_open.svg';
import IconButton from '@components/common/IconButton';
import useBookmark from '@hooks/useBookmark';
import { IArticleBook, IBookScraps } from '@interfaces';
import { TextMedium, TextSmall } from '@styles/common';
import encodeURL from '@utils/encode-url';
import { parseHeadings } from '@utils/toc';

import {
  ArticleLink,
  ArticleList,
  ArticleListTitle,
  ArticleTitle,
  BookmarkButton,
  CurrentArticle,
  ProfileImage,
  ProfileLabel,
  SidebarContainer,
  SidebarFooter,
  SidebarHeader,
  SidebarOpenButton,
  SidebarTitle,
  TocArticleTitle,
} from './styled';

interface SidebarProps {
  book: IBookScraps;
  article: IArticleBook;
  isOpen: boolean;
  handleSideBarToggle: () => void;
}

export default function Sidebar({ book, article, isOpen, handleSideBarToggle }: SidebarProps) {
  const { title, user, scraps } = book;
  const { id: articleId, content } = article;

  const { handleBookmarkClick, curBookmarkCnt, curBookmarkId } = useBookmark(book);
  const [isTocVisible, setTocVisible] = useState(true);

  const handleTocToggle = () => {
    setTocVisible((prev) => !prev);
  };

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

        <ArticleList>
          <ArticleListTitle>목차</ArticleListTitle>
          {scraps.map((scrap) => {
            return scrap.article.id !== articleId ? (
              <ArticleLink
                href={`/@${user.nickname}/${encodeURL(book.title, scrap.article.title)}`}
                key={scrap.id}
              >
                {scrap.order}. {scrap.article.title}
              </ArticleLink>
            ) : (
              <CurrentArticle key={scrap.id}>
                <ArticleTitle onClick={handleTocToggle}>
                  {scrap.order}. {scrap.article.title}
                </ArticleTitle>
                {isTocVisible &&
                  parseHeadings(content).map(({ heading, link, padding }) => (
                    <TocArticleTitle key={link} href={link} padding={padding}>
                      {heading}
                    </TocArticleTitle>
                  ))}
              </CurrentArticle>
            );
          })}
        </ArticleList>

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
