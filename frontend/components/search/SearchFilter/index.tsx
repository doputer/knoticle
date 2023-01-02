import useUser from '@hooks/useUser';

import { FilterButton, FilterGroup, FilterLabel, FilterWrapper } from './styled';

interface Filter {
  type: string;
  isUsers: boolean;
}

interface SearchFilterProps {
  handleFilter: (value: { [value: string]: string | boolean }) => void;
  filter: Filter;
}

export default function SearchFilter({ handleFilter, filter }: SearchFilterProps) {
  const { isSignInUser } = useUser();

  return (
    <FilterWrapper>
      <FilterGroup>
        <FilterLabel>
          <FilterButton
            type="radio"
            name="type"
            onChange={() => handleFilter({ type: 'article' })}
            checked={filter.type !== 'book'}
          />
          글
        </FilterLabel>
        <FilterLabel>
          <FilterButton
            type="radio"
            name="type"
            onChange={() => handleFilter({ type: 'book' })}
            checked={filter.type === 'book'}
          />
          책
        </FilterLabel>
      </FilterGroup>
      {isSignInUser && (
        <FilterLabel>
          <FilterButton
            type="checkbox"
            onChange={() => handleFilter({ isUsers: !filter.isUsers })}
            checked={filter.isUsers}
          />
          내 책에서 검색
        </FilterLabel>
      )}
    </FilterWrapper>
  );
}
