import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import { RegistrationPage } from './pages/RegistrationPage';
import DetailedLocationPage from './pages/DetailedLocationPage';
import FAQPage from './pages/FAQPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/feed' element={<FeedPage />} />
          <Route path='/location/:id' element={<DetailedLocationPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/user/:id' element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
