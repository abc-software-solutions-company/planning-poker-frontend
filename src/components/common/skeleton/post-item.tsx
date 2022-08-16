import {FC} from 'react';
import ContentLoader from 'react-content-loader';

interface IProps {
  className?: string;
}

const PostItemSkeleton: FC<IProps> = ({className}) => (
  <ContentLoader
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 1070 230"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    className={className}
  >
    <rect x="360" y="188" width="89" height="16" rx="4" />
    <rect x="360" y="128" width="710" height="16" rx="4" />
    <rect x="360" y="96" width="710" height="16" rx="4" />
    <rect x="360" y="64" width="710" height="16" rx="4" />
    <rect x="360" y="33" width="710" height="16" rx="4" />
    <rect x="360" width="710" height="16" rx="4" />
    <rect width="340" height="230" rx="8" />
  </ContentLoader>
);

PostItemSkeleton.displayName = 'PostItemSkeleton';

export default PostItemSkeleton;
