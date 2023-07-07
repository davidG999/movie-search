import { BrowserRouter, Routes, Route } from "react-router-dom"

import Trending from "./pages/Trending"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Search from "./pages/Search"
import NotFound from "./pages/NotFound"
import SingleContentInfo from "./pages/single-content-info/SingleContentInfo"
import Navbar from "./components/navbar/Navbar"

import "./index.css"

const App: React.FC = () => {
  return (
    <div className="text-gray-300 bg-zinc-800 selection:bg-slate-700 selection:text-cyan-400">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/:id" element={<SingleContentInfo />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  )
}

export default App
