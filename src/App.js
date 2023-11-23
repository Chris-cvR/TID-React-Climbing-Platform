import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import { RegistrationPage } from './pages/RegistrationPage';
import DetailedLocationPage from './pages/DetailedLocationPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FeedPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/location/:id' element={<DetailedLocationPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/register' element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
