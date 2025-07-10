import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
