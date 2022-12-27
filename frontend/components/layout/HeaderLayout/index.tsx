import GNB from '@components/common/GNB';

import { PageContainer } from './styled';

interface HeaderLayoutProps {
  children: React.ReactNode;
}

export default function HeaderLayout({ children }: HeaderLayoutProps) {
  return (
    <PageContainer>
      <GNB />
      {children}
    </PageContainer>
  );
}
