import ContentLoader from 'react-content-loader';

const CategoryWidgetLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={450}
    height={200}
    viewBox="0 0 450 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="3" y="10" rx="5" ry="5" width="200" height="10" />
    <rect x="3" y="45" rx="5" ry="5" width="200" height="10" />
    <rect x="3" y="80" rx="5" ry="5" width="200" height="10" />
    <rect x="3" y="115" rx="5" ry="5" width="200" height="10" />
  </ContentLoader>
);

export default CategoryWidgetLoader;
