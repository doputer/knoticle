import Image from 'next/image';

import { useState } from 'react';

import Bookmark from '@assets/ico_bookmark.svg';
import BookmarkFilled from '@assets/ico_bookmark_white_filled.svg';
import HideIcon from '@assets/ico_hide.svg';
import OpenIcon from '@assets/ico_open.svg';
import useBookmark from '@hooks/useBookmark';
import { IBookScraps } from '@interfaces';
import { TextMedium, TextSmall } from '@styles/common';
import encodeURL from '@utils/encode-url';

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
  articleId: number;
  articleToc: {
    heading: string;
    link: string;
    padding: number;
  }[];
  book: IBookScraps;
  isOpen: boolean;
  handleSideBarToggle: () => void;
}

export default function Sidebar({
  articleId,
  articleToc,
  book,
  isOpen,
  handleSideBarToggle,
}: SidebarProps) {
  const { title, user, scraps } = book;
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
          <Image src={HideIcon} alt="Closed Sidebar Icon" onClick={handleSideBarToggle} />
        </SidebarHeader>

        <SidebarTitle>{title}</SidebarTitle>

        <ArticleList>
          <ArticleListTitle>목차</ArticleListTitle>
          {scraps.map((scrap) => {
            return scrap.article.id !== articleId ? (
              <ArticleLink
                href={`/@${user.nickname}/${encodeURL(
                  scrap.article.book?.title || '',
                  scrap.article.title
                )}`}
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
                  articleToc.map((article) => (
                    <TocArticleTitle
                      key={article.link}
                      href={article.link}
                      padding={article.padding}
                    >
                      {article.heading}
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
          <ProfileImage src={user.profile_image} width={70} height={70} alt="Viewer Icon" />
        </SidebarFooter>
      </SidebarContainer>

      {!isOpen && (
        <SidebarOpenButton onClick={handleSideBarToggle}>
          <Image src={OpenIcon} alt="Open Sidebar Icon" />
        </SidebarOpenButton>
      )}
    </>
  );
}
