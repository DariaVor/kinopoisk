import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width="250"
    height="375"
    viewBox="0 0 250 375"
    style={{
      width: '100%',
      aspectRatio: '2 / 3',
    }}
    backgroundColor="#111"
    foregroundColor="#222"
  >
    <rect x="0" y="0" rx="12" ry="12" width="250" height="375" />
  </ContentLoader>
);

export default Skeleton;
