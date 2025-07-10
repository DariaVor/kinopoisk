import { NavLink } from 'react-router';
import s from './Header.module.css';

const Header: React.FC = () => {
  return (
    <nav className={s.nav}>
      <NavLink to="/" className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}>
        Главное
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
      >
        Моё
      </NavLink>
    </nav>
  );
};
export default Header;
