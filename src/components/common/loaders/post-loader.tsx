import ContentLoader from 'react-content-loader';

const PostLoader = (props: any) => (
  <ContentLoader
    width={450}
    height={330}
    viewBox="0 0 450 330"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    {...props}
  >
    <rect x="42" y="0" rx="10" ry="10" width="440" height="217" />
    <rect x="43" y="230" rx="4" ry="4" width="440" height="9" />
    <rect x="44" y="250" rx="3" ry="3" width="119" height="6" />
    <rect x="43" y="270" rx="4" ry="4" width="440" height="9" />
  </ContentLoader>
);

export default PostLoader;
