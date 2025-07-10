import { Link } from 'react-router';
import s from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <p>Страница не найдена</p>
      <Link to="/" className={s.btn}>
        Вернуться на главную
      </Link>
    </div>
  );
};
export default NotFound;
