import { PageInnerLarge } from './styled';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return <PageInnerLarge>{children}</PageInnerLarge>;
}
