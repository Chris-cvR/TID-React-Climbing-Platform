import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage'
import DetailedLocationPage from './pages/LocationsPage'
import AboutPage from './pages/AboutPage'
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FeedPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/location' element={<DetailedLocationPage />}></Route>
          <Route path='/about' element={<AboutPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
