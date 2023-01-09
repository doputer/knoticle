import styled from 'styled-components';

import { Flex, FlexColumn } from '@styles/layout';

export const EditorContainer = styled(FlexColumn)`
  flex: 1;
  padding: 32px;
  background-color: var(--white-color);
  gap: 16px;
  box-sizing: border-box;
  overflow: hidden;
`;

export const EditorWrapper = styled.div`
  flex: 1;
  background-color: #fff;
  border: 1px solid var(--grey-02-color);
  border-radius: 8px;
  overflow: auto;
`;

export const EditorButtonWrapper = styled(Flex)`
  padding: 8px;
  align-items: center;
  gap: 8px;
  background-color: #fff;
  border-bottom: 1px solid var(--grey-02-color);
  position: sticky;
  top: 0px;
  z-index: 100;
  box-sizing: border-box;
  flex-wrap: wrap;
`;

export const EditorButton = styled.button.attrs({ tabIndex: -1 })`
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: var(--light-orange-color);
  }

  label {
    width: 24px;
    height: 24px;
  }
`;

export const EditorImageInput = styled.input`
  display: none;
`;

export const EditorButtonSplit = styled.div`
  border-left: 2px solid var(--grey-02-color);
  height: 16px;
`;

export const CodeMirrorWrapper = styled.div`
  padding: 16px;
  font-size: 16px;

  .cm-editor.cm-focused {
    outline: none;
  }
`;
