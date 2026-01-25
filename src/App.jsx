import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';

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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
