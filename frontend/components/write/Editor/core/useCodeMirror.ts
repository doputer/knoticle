import { useCallback, useEffect, useState } from 'react';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorState } from '@codemirror/state';
import { placeholder } from '@codemirror/view';
import { EditorView } from 'codemirror';

import useImage from '@hooks/useImage';

import EditorTheme from './theme';
import useView from './useView';

export default function useCodeMirror() {
  const [isReady, setReady] = useState(false);
  const [document, setDocument] = useState('');
  const [element, setElement] = useState<HTMLElement>();
  const { setView, replaceDocument, insertStartToggle, insertBetweenToggle, insertCursor } =
    useView();
  const { handleImage } = useImage({
    onSuccess: (image) => {
      const markdownImage = (path: string) => `![image](${path})`;
      const text = markdownImage(image.imagePath);

      insertCursor(text);
    },
  });

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    setElement(node);
  }, []);

  const EditorChangeEvent = () => {
    return EditorView.updateListener.of(({ view, docChanged }) => {
      if (docChanged) setDocument(view.state.doc.toString());
    });
  };

  const EditorEventHandler = () => {
    return EditorView.domEventHandlers({
      paste(event) {
        if (!event.clipboardData) return;

        const { items } = event.clipboardData;

        // eslint-disable-next-line no-restricted-syntax
        for (const item of items) {
          if (!(item.kind === 'file')) return;
          handleImage(item.getAsFile() as File);
        }
      },
      drop(event, view) {
        if (!event.dataTransfer) return;

        const cursorPos = view.posAtCoords({ x: event.clientX, y: event.clientY });
        if (cursorPos) view.dispatch({ selection: { anchor: cursorPos, head: cursorPos } });

        const { files } = event.dataTransfer;

        // eslint-disable-next-line no-restricted-syntax
        for (const file of files) handleImage(file);
      },
    });
  };

  useEffect(() => {
    if (!element) return undefined;

    const editorState = EditorState.create({
      extensions: [
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
        }),
        placeholder('내용을 입력해주세요.'),
        EditorTheme(),
        EditorChangeEvent(),
        EditorEventHandler(),
      ],
    });

    const view = new EditorView({
      state: editorState,
      parent: element,
    });

    setView(view);
    setReady(true);

    return () => view.destroy();
  }, [element]);

  return {
    isReady,
    ref,
    document,
    replaceDocument,
    insertStartToggle,
    insertBetweenToggle,
    insertCursor,
    handleImage,
  };
}
