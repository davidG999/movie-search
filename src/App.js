// React
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Styles
import './index.css';

// Components
import Header from './components/Header';
import Navbar from './components/Navbar';
import SingleContentInfo from './components/SingleContentInfo';

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
          <Route path="/:id" element={<SingleContentInfo />} />
          <Route path="/movies" element={<Movies />} />
          <Route path='/movies/:id' element={<SingleContentInfo />} />
          <Route path="/series" element={<Series />} />
          <Route path='/series/:id' element={<SingleContentInfo />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:id" element={<SingleContentInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;