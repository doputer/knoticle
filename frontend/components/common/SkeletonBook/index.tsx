import {
  BookAuthor,
  BookBody,
  BookContainer,
  BookDescription,
  BookInformation,
  Bookmark,
  BookScrap,
  BookScrapList,
  BookThumbnail,
  BookTitle,
} from './styled';

export default function SkeletonBook() {
  const scrapList = Array.from({ length: 4 }, (_, i) => i + 1);

  return (
    <BookContainer>
      <BookThumbnail />

      <BookBody>
        <BookInformation>
          <BookDescription>
            <BookTitle />
            <BookAuthor />
          </BookDescription>
          <Bookmark />
        </BookInformation>
        <BookScrapList>
          {scrapList.map((key) => (
            <BookScrap key={key} />
          ))}
        </BookScrapList>
      </BookBody>
    </BookContainer>
  );
}
