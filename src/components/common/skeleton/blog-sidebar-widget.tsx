import {FC} from 'react';
import ContentLoader from 'react-content-loader';

interface IProps {
  className?: string;
}

const BlogSidebarWidget: FC<IProps> = ({className}) => (
  <ContentLoader
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 350 144"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    className={className}
  >
    <rect width="232" height="20" rx="4" />
    <rect y="56" width="148" height="16" rx="4" />
    <rect y="31" width="350" height="5" rx="2" />
    <rect y="92" width="148" height="16" rx="4" />
    <rect y="128" width="148" height="16" rx="4" />
  </ContentLoader>
);

BlogSidebarWidget.displayName = 'BlogSidebarWidget';

export default BlogSidebarWidget;
