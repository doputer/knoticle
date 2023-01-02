import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { useRecoilState } from 'recoil';

import RemoveIcon from '@assets/ico_remove.svg';
import editInfoState from '@atoms/editInfo';
import scrapState from '@atoms/scrap';
import useModal from '@hooks/useModal';

import { Article, OriginalBadge, RemoveButton, Text, TextWapper } from './styled';

const ItemTypes = {
  Scrap: 'scrap',
};

export interface ScrapProps {
  id: number;
  scrapId: number;
  text: string;
  isOriginal: boolean;
  moveScrap: (id: number, to: number) => void;
  findScrap: (id: number) => { index: number };
  isShown: boolean;
  isContentsShown: boolean;
  isDeleteBtnShown: boolean;
}

interface Item {
  id: number;
  originalIndex: number;
}

export const ListItem = memo(function Scrap({
  id,
  scrapId,
  text,
  isOriginal,
  moveScrap,
  findScrap,
  isShown,
  isContentsShown,
  isDeleteBtnShown,
}: ScrapProps) {
  const { openModal } = useModal();

  const originalIndex = findScrap(id).index;
  const [scraps, setScraps] = useRecoilState(scrapState);
  const [editInfo, setEditInfo] = useRecoilState(editInfoState);

  // Drag
  const [, drag] = useDrag(
    () => ({
      // 타입설정 useDrop의 accept와 일치시켜야함
      type: ItemTypes.Scrap,
      item: { id, originalIndex },
      // Return array의 첫번째 값에 들어갈 객체를 정의한다.
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      // 드래그가 끝났을때 실행한다.
      end: (item, monitor) => {
        const { id: droppedId } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveScrap(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveScrap]
  );
  // Drop
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.Scrap,

      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findScrap(id);
          moveScrap(draggedId, overIndex);
        }
      },
    }),
    [findScrap, moveScrap]
  );

  const handleMinusBtnClick = () => {
    if (isOriginal) {
      openModal({
        modalType: 'Confirm',
        modalProps: {
          message: '이 글은 원본 글입니다. 정말로 삭제하시겠습니까?',
          handleConfirm: () => {
            setEditInfo({
              ...editInfo,
              deletedArticle: [...editInfo.deletedArticle, id],
              deletedScraps: [...editInfo.deletedScraps, scrapId],
            });
            setScraps(scraps.filter((v) => v.article.id !== id));
          },
        },
      });

      return;
    }

    openModal({
      modalType: 'Confirm',
      modalProps: {
        message: '글을 책에서 삭제하시겠습니까?',
        handleConfirm: () => {
          setEditInfo({
            ...editInfo,
            deletedScraps: [...editInfo.deletedScraps, scrapId],
          });
          setScraps(scraps.filter((v) => v.article.id !== id));
        },
      },
    });
  };

  return (
    <Article
      ref={(node) => drag(drop(node))}
      isShown={isContentsShown ? true : isShown}
      isEdit={isDeleteBtnShown}
      isActive={scrapId === 0}
    >
      <TextWapper>
        <Text>{text}</Text>
        {isOriginal && isDeleteBtnShown && <OriginalBadge>원본</OriginalBadge>}
      </TextWapper>
      {isDeleteBtnShown && (
        <RemoveButton onClick={handleMinusBtnClick}>
          <RemoveIcon />
        </RemoveButton>
      )}
    </Article>
  );
});
