import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
`;

export const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexSpaceBetween = styled(Flex)`
  display: flex;
  justify-content: space-between;
`;

export const FlexColumnCenter = styled(FlexColumn)`
  justify-content: center;
  align-items: center;
`;

export const FlexColumnSpaceBetween = styled(FlexColumn)`
  justify-content: space-between;
`;

export const FlexColumnAlignCenter = styled(FlexColumn)`
  align-items: center;
`;

export const FullPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const PageWrapper = styled.div`
  background-color: var(--light-yellow-color);
  min-height: 100vh;
`;

export const PageInnerSmall = styled(FlexColumnAlignCenter)`
  margin: 0 auto;
  max-width: 900px;
  padding: 0px 10px;
`;

export const PageInnerLarge = styled(FlexColumnAlignCenter)`
  margin: 0 auto;
  max-width: 1500px;
`;

export const TopBar = styled.nav`
  height: 67px;
`;

export const PageNoScrollWrapper = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0px;
  width: 100%;
`;

export const PageGNBHide = styled.div<{ isscrolldown: 'true' | 'false' }>`
  @media ${(props) => props.theme.mobile} {
    position: absolute;
    top: ${(props) => (props.isscrolldown === 'true' ? '-67px' : '0px')};
    transition: top 0.2s ease-in-out;
    width: 100%;
  }
`;

export const PageWrapperWithHeight = styled.div<{ initialHeight: number }>`
  padding-top: 64px;
  background-color: var(--light-yellow-color);
  min-height: ${(props) =>
    props.initialHeight !== 0 ? `${props.initialHeight + 600}px` : 'calc(100vh - 131px)'};
`;
