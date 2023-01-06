import { TabFilterWrapper, TabTitle } from './styled';

export type TabType = 'knot' | 'bookmark';

interface TabFilterProps {
  tab: TabType;
  handleTab: (tab: TabType) => void;
}

function TabFilter({ tab, handleTab }: TabFilterProps) {
  return (
    <TabFilterWrapper>
      <TabTitle onClick={() => handleTab('knot')} isActive={tab === 'knot'}>
        엮은 책
      </TabTitle>
      <TabTitle onClick={() => handleTab('bookmark')} isActive={tab === 'bookmark'}>
        북마크한 책
      </TabTitle>
    </TabFilterWrapper>
  );
}

export default TabFilter;
