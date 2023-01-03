import { useEffect, useState } from 'react';

import MoreIcon from '@assets/ico_more.svg';
import IconButton from '@components/common/IconButton';
import { IBookScraps } from '@interfaces';

import { BookOptionContainer, Dropdown, DropdownItem } from './styled';

interface BookOptionProps {
  book: IBookScraps;
}

function BookOption({ book }: BookOptionProps) {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdownToggle = (event?: React.MouseEvent) => {
    event?.stopPropagation();
    setDropdown(!dropdown);
  };

  const handleDocumentClick = () => setDropdown(false);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <BookOptionContainer>
      <IconButton icon={<MoreIcon />} onClick={handleDropdownToggle} />
      {dropdown && (
        <Dropdown>
          <DropdownItem>수정하기</DropdownItem>
          <DropdownItem>삭제하기</DropdownItem>
        </Dropdown>
      )}
    </BookOptionContainer>
  );
}

export default BookOption;
