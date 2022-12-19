import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';
import DashboardPage from './pages/DashboardPage';
import TypographyPage from './pages/TypographyPage'
import LoginPage from './pages/auth/LoginPage'
import ResetPassword from './pages/auth/ResetPassword';
import ProfilePage from './pages/profile/ProfilePage';
import ChangePasswordPage from './pages/profile/ChangePasswordPage';
import UserPreferencesPage from './pages/profile/UserPreferencesPage'
import AdminBlankPage from './pages/AdminBlankPage';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Genre from './pages/Genre';
import Movie from './pages/movie';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const App = () => {
  return (
    <Router>
      <AppInner />
    </Router>
  )
}

const AppInner = () => {
  const navigate = useNavigate();
  const {isLogin} = useSelector(state => state.auth);


  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  return (
      <Routes>
        <Route exact path='/' element={<DashboardPage />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/reset-password' element={<ResetPassword />} />
        <Route exact path='/profile' element={<ProfilePage />} />
        <Route exact path='/change-password' element={<ChangePasswordPage />} />
        <Route exact path='/preferences' element={<UserPreferencesPage />} />
        <Route exact path='/typography' element={<TypographyPage />} />
        <Route exact path='/blank-page' element={<AdminBlankPage />} />
        <Route exact path='/genre' element={<Genre />} />
        <Route exact path='/movie' element={<Movie />} />
      </Routes>
  )
}

export default App;
