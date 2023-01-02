import React, { useEffect, useState } from 'react';

import LeftArrowIcon from '@assets/ico_arrow_left.svg';
import RightArrowIcon from '@assets/ico_arrow_right.svg';
import FlowerIcon from '@assets/ico_flower.svg';
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
  title: string;
  books: IBookScraps[];
  bookCountPerPage: number;
  isLoading: boolean;
}

export default function Slider({ title, books, bookCountPerPage, isLoading }: SliderProps) {
  const {
    value: currentBookIndex,
    setValue: setCurrentBookIndex,
    isValueSet: isCurrentBookIndexSet,
  } = useSessionStorage(`${title}_CURRENT_BOOK_INDEX`, 0);

  const {
    value: currentPage,
    setValue: setCurrentPage,
    isValueSet: isCurrentPageSet,
  } = useSessionStorage(`${title}_CURRENT_PAGE`, 1);

  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

  const sliderIndicatorCount = Math.ceil((books?.length || 0) / bookCountPerPage);
  const sliderPageList = Array.from({ length: sliderIndicatorCount }, (_, index) => {
    return { key: index, isActive: currentPage === index + 1 };
  });

  const handleLeftArrowClick = () => {
    setCurrentBookIndex(currentBookIndex - bookCountPerPage);
    setCurrentPage(currentPage - 1);
  };

  const handleRightArrowClick = () => {
    setCurrentBookIndex(currentBookIndex + bookCountPerPage);
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
    if (!books) return;

    const newSliderNum = setNumBetween(
      Math.round(currentBookIndex / bookCountPerPage) + 1,
      1,
      sliderIndicatorCount
    );

    setCurrentPage(newSliderNum);
    setCurrentBookIndex((newSliderNum - 1) * bookCountPerPage);
  }, [bookCountPerPage]);

  return (
    <SliderContainer>
      <IconButton
        icon={<LeftArrowIcon />}
        onClick={handleLeftArrowClick}
        visible={currentPage !== 1}
      />

      <SliderInner bookCountPerPage={bookCountPerPage}>
        <SliderHeader>
          <SliderTitle>
            <FlowerIcon />
            {title}
          </SliderTitle>
          {bookCountPerPage !== 1 && (
            <SliderIndicatorWrapper>
              {sliderPageList.map(({ key, isActive }) => (
                <SliderIndicator key={key} isActive={isActive} />
              ))}
            </SliderIndicatorWrapper>
          )}
        </SliderHeader>

        <SliderBody>
          {!isLoading && isCurrentBookIndexSet && isCurrentPageSet ? (
            <SliderTrack
              currentBookIndex={currentBookIndex}
              onTouchStart={handleSliderTrackTouchStart}
              onTouchEnd={handleSliderTrackTouchEnd}
            >
              {books.map((book) => (
                <Book key={book.id} book={book} />
              ))}
            </SliderTrack>
          ) : (
            <Flex style={{ gap: 8 }}>
              {[1, 2, 3, 4].map((key) => (
                <SkeletonBook key={key} />
              ))}
            </Flex>
          )}
        </SliderBody>
      </SliderInner>

      <IconButton
        icon={<RightArrowIcon />}
        onClick={handleRightArrowClick}
        visible={currentPage !== sliderIndicatorCount}
      />
    </SliderContainer>
  );
}
