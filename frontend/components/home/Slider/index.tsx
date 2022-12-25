import Image from 'next/image';

import React, { useEffect, useState } from 'react';

import LeftArrowIcon from '@assets/ico_arrow_left.svg';
import RightArrowIcon from '@assets/ico_arrow_right.svg';
import ListIcon from '@assets/ico_flower.svg';
import Book from '@components/common/Book';
import SkeletonBook from '@components/common/SkeletonBook';
import useSessionStorage from '@hooks/useSessionStorage';
import { IBookScraps } from '@interfaces';
import { Flex } from '@styles/layout';

import {
  SliderBookContainer,
  SliderBookWrapper,
  SliderContent,
  SliderIcon,
  SliderIndicator,
  SliderIndicatorContainer,
  SliderInfo,
  SliderInfoContainer,
  SliderTitle,
  SliderTrack,
  SliderWrapper,
} from './styled';

const setNumBetween = (val: number, min: number, max: number) => {
  if (val < min) return min;
  if (val > max) return max;
  return val;
};

interface SliderProps {
  bookList: IBookScraps[];
  title: string;
  isLoading: boolean;
  numberPerPage: number;
}

export default function BookSlider({ bookList, title, isLoading, numberPerPage }: SliderProps) {
  const {
    value: curBookIndex,
    isValueSet: isCurBookIndexSet,
    setValue: setCurBookIndex,
  } = useSessionStorage(`${title}_curBookIndex`, 0);

  const {
    value: sliderNumber,
    isValueSet: isSliderNumberSet,
    setValue: setSliderNumber,
  } = useSessionStorage(`${title}_sliderNumber`, 1);

  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

  const SkeletonList = Array.from({ length: numberPerPage }, (_, i) => i + 1);

  const sliderIndicatorCount = bookList ? Math.ceil(bookList.length / numberPerPage) : 0;
  const sliderIndicatorNumbersList = Array.from({ length: sliderIndicatorCount }, (_, i) => i + 1);

  const handleLeftArrowClick = () => {
    setCurBookIndex(curBookIndex - numberPerPage);
    setSliderNumber(sliderNumber - 1);
  };

  const handleRightArrowClick = () => {
    setCurBookIndex(curBookIndex + numberPerPage);
    setSliderNumber(sliderNumber + 1);
  };

  const handleSliderTrackTouchStart = (e: React.TouchEvent) => {
    setTouchPosition({
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY,
    });
  };

  const handleSliderTrackTouchEnd = (e: React.TouchEvent) => {
    const distanceX = touchPosition.x - e.changedTouches[0].pageX;
    const distanceY = Math.abs(touchPosition.y - e.changedTouches[0].pageY);

    if (distanceX > 40 && distanceY < 10 && sliderNumber !== sliderIndicatorCount) {
      handleRightArrowClick();
    }
    if (distanceX < -40 && distanceY < 10 && sliderNumber !== 1) {
      handleLeftArrowClick();
    }
  };

  useEffect(() => {
    if (!bookList) return;

    const newSliderNum = setNumBetween(
      Math.round(curBookIndex / numberPerPage) + 1,
      1,
      sliderIndicatorCount
    );

    setSliderNumber(newSliderNum);
    setCurBookIndex((newSliderNum - 1) * numberPerPage);
  }, [numberPerPage]);

  return (
    <SliderWrapper>
      <SliderIcon
        src={LeftArrowIcon}
        alt="Left Arrow Icon"
        onClick={handleLeftArrowClick}
        isvisible={(sliderNumber !== 1).toString()}
      />

      <SliderContent numberPerPage={numberPerPage}>
        <SliderInfoContainer>
          <SliderInfo>
            <Image src={ListIcon} alt="List Icon" />
            <SliderTitle>{title}</SliderTitle>
          </SliderInfo>
          {numberPerPage !== 1 && (
            <SliderIndicatorContainer>
              {sliderIndicatorNumbersList.map((number) => {
                return <SliderIndicator key={number} isActive={number === sliderNumber} />;
              })}
            </SliderIndicatorContainer>
          )}
        </SliderInfoContainer>

        <SliderBookContainer>
          {!isLoading && isCurBookIndexSet && isSliderNumberSet ? (
            <SliderTrack
              curBookIndex={curBookIndex}
              onTouchStart={handleSliderTrackTouchStart}
              onTouchEnd={handleSliderTrackTouchEnd}
            >
              {bookList.map((book) => (
                <SliderBookWrapper key={book.id} numberPerPage={numberPerPage}>
                  <Book book={book} />
                </SliderBookWrapper>
              ))}
            </SliderTrack>
          ) : (
            <Flex>
              {SkeletonList.map((key) => (
                <SkeletonBook key={key} />
              ))}
            </Flex>
          )}
        </SliderBookContainer>
      </SliderContent>

      <SliderIcon
        src={RightArrowIcon}
        alt="Right Arrow Icon"
        onClick={handleRightArrowClick}
        isvisible={(sliderNumber !== sliderIndicatorCount).toString()}
      />
    </SliderWrapper>
  );
}
