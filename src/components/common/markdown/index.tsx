import cx from 'classnames';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkRehype from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import {getImageURL} from '@/utils/misc';

interface IProps {
  className?: string;
  children: any;
}

const Markdown: React.FC<IProps> = ({className, children}) => {
  return (
    <ReactMarkdown
      className={cx(className)}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[remarkRehype]}
      transformImageUri={uri => (uri.startsWith('http') ? uri : `${getImageURL(uri)}`)}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
