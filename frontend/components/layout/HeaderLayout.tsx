import { useEffect, useState } from 'react';

import GNB from '@components/common/GNB';
import { PageWrapper } from '@styles/layout';

interface HeaderLayoutProps {
  children: React.ReactNode;
}

export default function HeaderLayout({ children }: HeaderLayoutProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);

    if (scrollPosition >= lastScrollPosition) setScrollDirection('down');
    else setScrollDirection('up');
  };

  useEffect(() => {
    setLastScrollPosition(window.scrollY);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  useEffect(() => {
    if (scrollDirection === 'up') setVisible(true);
    else setVisible(false);
  }, [scrollDirection]);

  return (
    <PageWrapper>
      <GNB visible={visible} />
      {children}
    </PageWrapper>
  );
}
