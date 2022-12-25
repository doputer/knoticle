import Image from 'next/image';

import React, { useEffect, useState } from 'react';

import LeftArrowIcon from '@assets/ico_arrow_left.svg';
import RightArrowIcon from '@assets/ico_arrow_right.svg';
import ListIcon from '@assets/ico_flower.svg';
import Book from '@components/common/Book';
import IconButton from '@components/common/IconButton';
import SkeletonBook from '@components/common/SkeletonBook';
import useSessionStorage from '@hooks/useSessionStorage';
import { IBookScraps } from '@interfaces';
import { Flex } from '@styles/layout';

import {
  SliderBody,
  SliderContainer,
  SliderHeader,
  SliderIndicator,
  SliderIndicatorWrapper,
  SliderInner,
  SliderTitle,
  SliderTrack,
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
  bookCount: number;
}

export default function BookSlider({ bookList, title, isLoading, bookCount }: SliderProps) {
  const {
    value: currentBookIndex,
    setValue: setCurrentBookIndex,
    isValueSet: isCurBookIndexSet,
  } = useSessionStorage(`${title}_curBookIndex`, 0);

  const {
    value: currentPage,
    setValue: setCurrentPage,
    isValueSet: isSliderNumberSet,
  } = useSessionStorage(`${title}_sliderNumber`, 1);

  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

  const skeletonList = Array.from({ length: bookCount }, (_, i) => i + 1);

  const sliderIndicatorCount = Math.ceil((bookList?.length || 0) / bookCount);

  const sliderPageList = Array.from({ length: sliderIndicatorCount }, (_, index) => {
    return { key: index, isActive: currentPage === index + 1 };
  });

  const handleLeftArrowClick = () => {
    setCurrentBookIndex(currentBookIndex - bookCount);
    setCurrentPage(currentPage - 1);
  };

  const handleRightArrowClick = () => {
    setCurrentBookIndex(currentBookIndex + bookCount);
    setCurrentPage(currentPage + 1);
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

    if (distanceX > 40 && distanceY < 10 && currentPage !== sliderIndicatorCount) {
      handleRightArrowClick();
    }
    if (distanceX < -40 && distanceY < 10 && currentPage !== 1) {
      handleLeftArrowClick();
    }
  };

  useEffect(() => {
    if (!bookList) return;

    const newSliderNum = setNumBetween(
      Math.round(currentBookIndex / bookCount) + 1,
      1,
      sliderIndicatorCount
    );

    setCurrentPage(newSliderNum);
    setCurrentBookIndex((newSliderNum - 1) * bookCount);
  }, [bookCount]);

  return (
    <SliderContainer>
      <IconButton
        src={LeftArrowIcon}
        alt="Left Arrow Icon"
        onClick={handleLeftArrowClick}
        visible={currentPage !== 1}
      />

      <SliderInner bookCount={bookCount}>
        <SliderHeader>
          <SliderTitle>
            <Image src={ListIcon} alt="List Icon" />
            {title}
          </SliderTitle>
          {bookCount !== 1 && (
            <SliderIndicatorWrapper>
              {sliderPageList.map(({ key, isActive }) => (
                <SliderIndicator key={key} isActive={isActive} />
              ))}
            </SliderIndicatorWrapper>
          )}
        </SliderHeader>

        <SliderBody>
          {!isLoading && isCurBookIndexSet && isSliderNumberSet ? (
            <SliderTrack
              currentBookIndex={currentBookIndex}
              onTouchStart={handleSliderTrackTouchStart}
              onTouchEnd={handleSliderTrackTouchEnd}
            >
              {bookList.map((book) => (
                <Book key={book.id} book={book} />
              ))}
            </SliderTrack>
          ) : (
            <Flex>
              {skeletonList.map((key) => (
                <SkeletonBook key={key} />
              ))}
            </Flex>
          )}
        </SliderBody>
      </SliderInner>

      <IconButton
        src={RightArrowIcon}
        alt="Right Arrow Icon"
        onClick={handleRightArrowClick}
        visible={currentPage !== sliderIndicatorCount}
      />
    </SliderContainer>
  );
}
