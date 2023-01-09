import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import BoldIcon from '@assets/ico_bold.svg';
import CodeIcon from '@assets/ico_code.svg';
import H1Icon from '@assets/ico_h1.svg';
import H2Icon from '@assets/ico_h2.svg';
import H3Icon from '@assets/ico_h3.svg';
import ImageIcon from '@assets/ico_image.svg';
import ItalicIcon from '@assets/ico_italic.svg';
import LinkIcon from '@assets/ico_link.svg';
import QuoteIcon from '@assets/ico_quote.svg';
import articleState from '@atoms/article';
import articleBuffer from '@atoms/articleBuffer';
import Content from '@components/common/Content';
import EditBar from '@components/write/EditBar';
import useCodeMirror from '@components/write/Editor/core/useCodeMirror';
import useInput from '@hooks/useInput';
import { IArticle } from '@interfaces';

import {
  CodeMirrorWrapper,
  EditorButton,
  EditorButtonSplit,
  EditorButtonWrapper,
  EditorImageInput,
  EditorInner,
  EditorWrapper,
  TitleInput,
} from './styled';

interface EditorProps {
  handleModalOpen: () => void;
  originalArticle?: IArticle;
}

export default function Editor({ handleModalOpen, originalArticle = undefined }: EditorProps) {
  const {
    ref,
    document,
    replaceDocument,
    insertStartToggle,
    insertBetweenToggle,
    insertCursor,
    handleImage,
  } = useCodeMirror();
  const [buffer, setBuffer] = useRecoilState(articleBuffer);

  const [isModifyMode, setIsModifyMode] = useState(false);
  const [article, setArticle] = useRecoilState(articleState);
  const title = useInput();

  useEffect(() => {
    if (originalArticle) {
      setIsModifyMode(true);
      setBuffer({
        title: originalArticle.title,
        content: originalArticle.content,
      });
    }
  }, [originalArticle]);

  useEffect(() => {
    if (!buffer.title && !buffer.content) return;

    title.setValue(buffer.title);
    replaceDocument(buffer.content);

    setBuffer({ title: '', content: '' });
  }, [buffer]);

  useEffect(() => {
    setArticle({
      ...article,
      title: title.value,
      content: document,
    });
  }, [title.value, document]);

  return (
    <EditorWrapper>
      <EditorInner>
        <TitleInput placeholder="제목을 입력해주세요" {...title} />
        <EditorButtonWrapper>
          <EditorButton onClick={() => insertStartToggle('# ')}>
            <H1Icon />
          </EditorButton>
          <EditorButton onClick={() => insertStartToggle('## ')}>
            <H2Icon />
          </EditorButton>
          <EditorButton onClick={() => insertStartToggle('### ')}>
            <H3Icon />
          </EditorButton>
          <EditorButtonSplit />
          <EditorButton onClick={() => insertBetweenToggle('**')}>
            <BoldIcon />
          </EditorButton>
          <EditorButton onClick={() => insertBetweenToggle('_')}>
            <ItalicIcon />
          </EditorButton>
          <EditorButtonSplit />
          <EditorButton onClick={() => insertStartToggle('> ')}>
            <QuoteIcon />
          </EditorButton>
          <EditorButton onClick={() => insertBetweenToggle('\n```\n', '코드')}>
            <CodeIcon />
          </EditorButton>
          <EditorButtonSplit />
          <EditorButton onClick={() => insertCursor('[텍스트](주소)')}>
            <LinkIcon />
          </EditorButton>
          <EditorButton>
            <label htmlFor="image">
              <ImageIcon />
            </label>
            <EditorImageInput
              id="image"
              type="file"
              accept="image/png,image/jpg,image/jpeg,image/gif"
              onChange={(event) => {
                if (event.target.files) handleImage(event.target.files[0]);
              }}
            />
          </EditorButton>
        </EditorButtonWrapper>
        <CodeMirrorWrapper>
          <div ref={ref} />
        </CodeMirrorWrapper>
        <EditBar handleModalOpen={handleModalOpen} isModifyMode={isModifyMode} />
      </EditorInner>
      <EditorInner>
        <Content title={article.title} content={article.content} />
      </EditorInner>
    </EditorWrapper>
  );
}
