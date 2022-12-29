import { PageLarge } from './styled';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return <PageLarge>{children}</PageLarge>;
}
