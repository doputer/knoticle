import styled from 'styled-components';

export const EditorWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 67px);
  display: flex;
`;

export const EditorInner = styled.div`
  flex: 1;
  overflow: auto;
  padding: 8px;
`;

export const CodeMirrorWrapper = styled.div`
  .cm-editor.cm-focused {
    outline: none;
  }

  .cm-activeLine.cm-line {
    background-color: var(--light-orange-color);
  }
`;

export const TitleInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;
