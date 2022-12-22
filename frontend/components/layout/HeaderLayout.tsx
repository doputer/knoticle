import GNB from '@components/common/GNB';

interface HeaderLayoutProps {
  children: React.ReactNode;
}

export default function HeaderLayout({ children }: HeaderLayoutProps) {
  return (
    <>
      <GNB />
      {children}
    </>
  );
}
