import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import TvsPage from './pages/TvsPage';
import DetailPage from './pages/DetailPage';
import ActorPage from './pages/ActorPage';
import ActorStatPage from './pages/ActorStatPage';
import SearchPage from './pages/SearchPage';
import StatisticsPage from './pages/StatisticsPage';
import CollectionPage from './pages/CollectionPage';

import './App.css';

function App() {
  return (
    <BrowserRouter basename="/tmdb-vite-pado">
      <div className='main-content'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/tvs' element={<TvsPage />} />
            <Route path='/:type/:id' element={<DetailPage />} />
            <Route path='/actor/:id' element={<ActorPage />} />
            <Route path='/actor/:id/career' element={<ActorStatPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/statistics' element={<StatisticsPage />} />
            <Route path='/collection/:id' element={<CollectionPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
