import { createElement, Fragment, ReactNode, useEffect, useState } from 'react';

import rehypeHighlight from 'rehype-highlight';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const useParser = (markdown: string) => {
  const [content, setContent] = useState<ReactNode>();

  useEffect(() => {
    const html = unified()
      .use(remarkParse)
      .use(remarkBreaks)
      .use(remarkRehype)
      .use(rehypeStringify)
      .processSync(markdown);

    const file = unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeSanitize)
      .use(rehypeSlug)
      .use(rehypeHighlight, { ignoreMissing: true })
      .use(rehypeReact, { createElement, Fragment })
      .processSync(html);

    setContent(file.result);
  }, [markdown]);

  return content;
};

export default useParser;
