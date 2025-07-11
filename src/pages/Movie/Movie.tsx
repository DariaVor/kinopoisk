import { useParams } from 'react-router';

const Movie: React.FC = () => {
  const { id } = useParams();

  return <div>Movie {id}</div>;
};
export default Movie;
