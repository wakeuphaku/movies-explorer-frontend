import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import moviesApi from '../../utils/MoviesApi';
import api from '../../utils/MainApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Navigation from '../Navigation/Navigation';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';

export default function App() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isLogin, setIsLogin] = useState(localStorage.getItem('jwt') || false);
  const [isChanged, setIsChanged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleCheckToken();
  }, []);

  function openLinks() {
    setOpenMenu(true);
  }

  function closeLinks() {
    setOpenMenu(false);
  }

  useEffect(() => {
    if (isLogin) {
      api
        .getCurrentUser()
        .then(res => {
          setCurrentUser(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [isLogin]);

  useEffect(() => {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then(res => {
        const movies = res.map(movie => ({ ...movie, owner: '' }));
        setMovie(movies);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleRegister = (name, email, password) => {
    api
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
        navigate('/movies', { replace: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  function handleLogin(email, password) {
    api
      .login(email, password)
      .then(item => {
        localStorage.setItem('currentUser', JSON.stringify(item));
        setIsLogin(true);
        setCurrentUser(item);
        navigate('/movies', { replace: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleCheckToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .checkToken(jwt)
        .then(item => {
          if (item) {
            setIsLogin(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleUpdateProfile = (name, email) => {
    api
      .updateProfile(name, email)
      .then(item => {
        localStorage.setItem('currentUser', JSON.stringify(item));
        setCurrentUser(item);
        setIsSuccess(true);
        setIsChanged(true);
      })
      .catch(err => {
        setIsSuccess(false);
        console.log(err);
      });
  };

  const handleLoguot = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  useEffect(() => {
    if (isLogin && currentUser) {
      api.getMovies().then(res => {
        setSavedMovies(res);
      });
    }
  }, [currentUser, isLogin]);

  const handleSaveMovie = movie => {
    api
      .saveMovies(movie)
      .then(item => {
        setSavedMovies([item, ...savedMovies]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(
      item => item.movieId === movie.id || item.movieId === movie.movieId
    );
    api
      .deleteMovies(savedMovie._id)
      .then(() => {
        const filteredMovies = savedMovies.filter(movies => {
          if (movie.id === movies.movieId || movie.movieId === movies.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMovies(filteredMovies);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header isMain={true} isLoggin={isLogin} openLinks={openLinks} />
                <Main openLinks={openLinks} />
              </>
            }
          />

          <Route
            path="/movies"
            element={
              <>
                <Header isMain={true} isLoggin={isLogin} openLinks={openLinks} />
                <ProtectedRoute
                  isLogin={isLogin}
                  element={Movies}
                  movie={movie}
                  savedList={savedMovies}
                  onSave={handleSaveMovie}
                  savedMovies={savedMovies}
                  onDelete={handleDeleteMovie}
                />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header isMain={true} isLoggin={isLogin} openLinks={openLinks} />
                <ProtectedRoute
                  isLogin={isLogin}
                  movie={movie}
                  element={SavedMovies}
                  onSave={handleSaveMovie}
                  savedMovies={savedMovies}
                  onDelete={handleDeleteMovie}
                />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header isMain={true} isLoggin={isLogin} openLinks={openLinks} />
                <ProtectedRoute
                  element={Profile}
                  isLogin={isLogin}
                  onSubmit={handleUpdateProfile}
                  logout={handleLoguot}
                  isSuccess={isSuccess}
                />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              isLogin ? (
                <Navigate to="/movies" />
              ) : (
                <Login handleLoginSubmit={handleLogin} isLogin={isLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLogin ? (
                <Navigate to="/movies" />
              ) : (
                <Register handleRegisterSubmit={handleRegister} />
              )
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Navigation isOpen={openMenu} closeLinks={closeLinks} />
      </CurrentUserContext.Provider>
    </>
  );
}
