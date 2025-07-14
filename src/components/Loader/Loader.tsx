import s from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={s.loaderWrapper}>
      <div className={s.spinner}></div>
    </div>
  );
};

export default Loader;
