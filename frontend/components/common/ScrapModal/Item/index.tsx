import { Reorder, useDragControls } from 'framer-motion';

import DragIcon from '@assets/ico_drag.svg';
import OwnerIcon from '@assets/ico_owner.svg';
import { IScrap } from '@interfaces';
import { Ellipsis } from '@styles/layout';

import { ItemWrapper } from './styled';

interface ItemProps {
  scrap: IScrap;
  isTarget: boolean;
}

function Item({ scrap, isTarget }: ItemProps) {
  const dragControls = useDragControls();

  return (
    <ItemWrapper>
      <Reorder.Item
        key={scrap.id}
        value={scrap}
        dragListener={false}
        dragControls={dragControls}
        style={{ backgroundColor: isTarget ? 'var(--light-orange-color)' : '' }}
      >
        <Ellipsis>{scrap.article.title}</Ellipsis>
        {scrap.is_original && <OwnerIcon />}
        <DragIcon onPointerDown={(event) => dragControls.start(event)} />
      </Reorder.Item>
    </ItemWrapper>
  );
}

export default Item;
