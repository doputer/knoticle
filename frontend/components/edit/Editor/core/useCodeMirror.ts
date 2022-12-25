import { useCallback, useEffect, useState } from 'react';

import { indentWithTab } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorState } from '@codemirror/state';
import { keymap, placeholder } from '@codemirror/view';
import { EditorView } from 'codemirror';

import { createImageApi } from '@apis/imageApi';
import useFetch from '@hooks/useFetch';

import theme from './theme';

export default function useCodeMirror() {
  const { data: image, execute: createImage } = useFetch(createImageApi);

  const [editorView, setEditorView] = useState<EditorView>();

  const [document, setDocument] = useState('');
  const [element, setElement] = useState<HTMLElement>();

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    setElement(node);
  }, []);

  const replaceDocument = (insert: string) => {
    if (!editorView) return;

    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert,
      },
    });
  };

  const handleImage = (imageFile: File) => {
    if (!/image\/[png,jpg,jpeg,gif]/.test(imageFile.type)) return;

    const formData = new FormData();

    formData.append('image', imageFile);

    createImage(formData);
  };

  const onChange = () => {
    return EditorView.updateListener.of(({ view, docChanged }) => {
      if (docChanged) setDocument(view.state.doc.toString());
    });
  };

  const insertStartToggle = (symbol: string) => {
    if (!editorView) return;

    editorView.focus();

    const { head } = editorView.state.selection.main;
    const { from, to, text } = editorView.state.doc.lineAt(head);

    const hasExist = text.startsWith(symbol);

    if (!hasExist) {
      editorView.dispatch({
        changes: {
          from,
          to,
          insert: `${symbol}${text}`,
        },
        selection: {
          anchor: from + text.length + symbol.length,
        },
      });

      return;
    }

    editorView.dispatch({
      changes: {
        from,
        to,
        insert: `${text.slice(symbol.length, text.length)}`,
      },
    });
  };

  const insertBetweenToggle = (symbol: string, defaultText = '텍스트') => {
    if (!editorView) return;

    editorView.focus();

    const { from, to } = editorView.state.selection.ranges[0];

    const text = editorView.state.sliceDoc(from, to);

    const prefixText = editorView.state.sliceDoc(from - symbol.length, from);
    const affixText = editorView.state.sliceDoc(to, to + symbol.length);

    const hasExist = symbol === prefixText && symbol === affixText;

    if (!hasExist) {
      editorView.dispatch({
        changes: {
          from,
          to,
          insert: `${symbol}${text || defaultText}${symbol}`,
        },
        selection: {
          head: from + symbol.length,
          anchor: text ? to + symbol.length : to + symbol.length + defaultText.length,
        },
      });

      return;
    }

    editorView.dispatch({
      changes: {
        from: from - symbol.length,
        to: to + symbol.length,
        insert: text,
      },
      selection: {
        head: from - symbol.length,
        anchor: to - symbol.length,
      },
    });
  };

  const insertCursor = (text: string) => {
    if (!editorView) return;

    editorView.focus();

    const cursor = editorView.state.selection.main.head;

    editorView.dispatch({
      changes: { from: cursor, to: cursor, insert: text },
      selection: { anchor: cursor + text.length },
    });
  };

  const eventHandler = () => {
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
    if (!editorView) return;

    const markdownImage = (path: string) => `![image](${path})`;
    const text = markdownImage(image?.imagePath);

    insertCursor(text);
  }, [image]);

  useEffect(() => {
    if (!element) return;

    const editorState = EditorState.create({
      extensions: [
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
        }),
        placeholder('내용을 입력해주세요.'),
        theme(),
        onChange(),
        eventHandler(),
        EditorView.lineWrapping,
        EditorView.theme({
          '.cm-content': {
            padding: 0,
            lineHeight: 2,
            fontFamily: 'Noto Sans KR',
          },
          '.cm-line': {
            padding: 0,
          },
        }),
        keymap.of([indentWithTab]),
      ],
    });

    const view = new EditorView({
      state: editorState,
      parent: element,
    });

    setEditorView(view);

    // eslint-disable-next-line consistent-return
    return () => view?.destroy();
  }, [element]);

  return {
    ref,
    document,
    replaceDocument,
    insertStartToggle,
    insertBetweenToggle,
    insertCursor,
    handleImage,
  };
}
