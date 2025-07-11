import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';
import NotFound from './pages/NotFound/NotFound';
import Movie from './pages/Movie/Movie';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
