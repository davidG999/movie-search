import { BrowserRouter, Route, Routes } from "react-router-dom";

import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import SingleContentInfo from "./pages/single-content-info/SingleContentInfo";
import Navbar from "./components/navbar/Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient";

const App: React.FC = () => {
  return (
    <div className="bg-zinc-800 text-gray-300 selection:bg-slate-700 selection:text-cyan-400">
      <QueryClientProvider client={queryClient}>
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
          <ReactQueryDevtools />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
