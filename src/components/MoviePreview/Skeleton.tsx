import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={450}
    viewBox="0 0 300 450"
    backgroundColor="#1a1a1a"
    foregroundColor="#2b2b2b"
  >
    <rect x="0" y="0" rx="12" ry="12" width="300" height="450" />
  </ContentLoader>
);

export default Skeleton;
