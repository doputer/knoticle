import Image from 'next/image';

import Bookmark from '@assets/ico_bookmark.svg';
import Hide from '@assets/ico_hide.svg';
import SampleProflie from '@assets/ico_sampleProfile.svg';
import { TextMedium, TextSmall } from '@styles/common';

import {
  TocWrapper,
  TocSideBar,
  TocIcons,
  TocTitle,
  TocContainer,
  TocList,
  TocProflie,
  TocProflieText,
  TocImgWrapper,
} from './styled';

const sampleData = {
  bookmarkNum: 398,
  bookTitle: '리액트 마스터하기',
  articles: ['Create-react-app', 'JSX'],
  username: 'Web01',
};

export default function TOC() {
  return (
    <TocWrapper>
      <TocSideBar>
        <TocIcons>
          <Image src={Bookmark} alt="Viewer Icon" />
          <Image src={Hide} alt="Viewer Icon" />
        </TocIcons>
        <TextSmall>{sampleData.bookmarkNum}</TextSmall>
        <TocTitle>{sampleData.bookTitle}</TocTitle>

        <TocContainer>
          <TextMedium>목차</TextMedium>
          <TocList>
            {sampleData.articles.map((v, i) => {
              return (
                <TextSmall key={v}>
                  {i + 1}.{v}
                </TextSmall>
              );
            })}
          </TocList>
        </TocContainer>
      </TocSideBar>
      <TocProflie>
        <TocProflieText>
          <TextSmall>Written by</TextSmall>
          <TextMedium>{sampleData.username}</TextMedium>
        </TocProflieText>
        <TocImgWrapper src={SampleProflie} alt="Viewer Icon" />
      </TocProflie>
    </TocWrapper>
  );
}
