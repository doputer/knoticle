import { useCallback, useState } from 'react';

import { EditorView } from 'codemirror';

function useView() {
  const [view, setView] = useState<EditorView>();

  const replaceDocument = useCallback(
    (insert: string) => {
      if (!view) return;

      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert,
        },
      });
    },
    [view]
  );

  const insertStartToggle = useCallback(
    (symbol: string) => {
      if (!view) return;

      view.focus();

      const { head } = view.state.selection.main;
      const { from, to, text } = view.state.doc.lineAt(head);

      const hasExist = text.startsWith(symbol);

      if (!hasExist) {
        view.dispatch({
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

      view.dispatch({
        changes: {
          from,
          to,
          insert: `${text.slice(symbol.length, text.length)}`,
        },
      });
    },
    [view]
  );

  const insertBetweenToggle = useCallback(
    (symbol: string, defaultText = '텍스트') => {
      if (!view) return;

      view.focus();

      const { from, to } = view.state.selection.ranges[0];

      const text = view.state.sliceDoc(from, to);

      const prefixText = view.state.sliceDoc(from - symbol.length, from);
      const affixText = view.state.sliceDoc(to, to + symbol.length);

      const hasExist = symbol === prefixText && symbol === affixText;

      if (!hasExist) {
        view.dispatch({
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

      view.dispatch({
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
    },
    [view]
  );

  const insertCursor = useCallback(
    (text: string) => {
      if (!view) return;

      view.focus();

      const cursor = view.state.selection.main.head;

      view.dispatch({
        changes: { from: cursor, to: cursor, insert: text },
        selection: { anchor: cursor + text.length },
      });
    },
    [view]
  );

  return { setView, replaceDocument, insertStartToggle, insertBetweenToggle, insertCursor };
}

export default useView;
