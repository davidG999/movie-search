// React
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Styles
import './index.css';

// Components
import Header from './components/Header';
import Navbar from './components/Navbar';

// Pages
import Trending from './pages/Trending';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div className="text-gray-300 bg-zinc-800">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;