import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import moviesApi from '../../utils/MoviesApi'
import api from "../../utils/MainApi";
import {CurrentUserContext} from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Main from '../Main/Main';
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import Navigation from "../Navigation/Navigation";
import NotFound from "../NotFound/NotFound";
import Header from "../Header/Header";


export default function App() {
    const [openMenu, setOpenMenu] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);


    const navigate = useNavigate();


    useEffect(() => {
        handleCheckToken();
    }, []);

    function openLinks() {
        setOpenMenu(true)
    }

    function closeLinks() {
        setOpenMenu(false)
    }


    useEffect(() => {
        if (isLogin) {
            api.getCurrentUser()
                .then((res) => {
                    setCurrentUser(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [isLogin]);

    useEffect(() => {
        setIsLoading(true);
        moviesApi.getMovies()
            .then((res) => {
                const movies = res.map((movie) => ({...movie, owner: ''}));
                setMovie(movies);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, []);

    const handleRegister = (name, email, password) => {
        api.register(name, email, password)
            .then(() => {
                handleLogin(email, password);
                navigate('/movies', {replace: true});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleLogin(email, password) {
        api.login(email, password)
            .then((item) => {
                localStorage.setItem('currentUser', JSON.stringify(item));
                setIsLogin(true);
                setCurrentUser(item)
                navigate('/movies', {replace: true});
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const handleCheckToken = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            api.checkToken(jwt)
                .then((item) => {
                    if (item) {
                        setIsLogin(true);
                    }
                })
                .catch((err) => {

                    console.log(err);
                })

        }
    };

    const handleUpdateProfile = (name, email) => {
        api.updateProfile(name, email)
            .then((item) => {
                localStorage.setItem('currentUser', JSON.stringify(item));
                setCurrentUser(item);
                setIsChanged(true);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleLoguot = () => {
        localStorage.clear();
        setIsLogin(false);
    }

    useEffect(() => {
        if (isLogin && currentUser) {
            api.getMovies()
                .then((res) => {
                    setSavedMovies(res)
                })
        }
    }, [currentUser, isLogin])

    const handleSaveMovie = (movie) => {
        api.saveMovies(movie)
            .then((item) => {
                setSavedMovies([...savedMovies, item]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDeleteMovie(movie) {
        api.deleteMovies(movie._id)
            .then(() => {
                setSavedMovies(savedMovies.filter((item) => item._id !== movie._id));
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>

                <Routes>
                    <Route path='/' element={
                        <>
                            <Header isMain={true} isLoggin={isLogin} openLinks={openLinks}/>
                            <Main openLinks={openLinks}/>
                        </>
                    }/>

                    <Route path='/movies'
                           element={
                               <>
                                   <Header isMain={true} isLoggin={isLogin} openLinks={openLinks}/>
                                   <ProtectedRoute
                                       isLogin={isLogin}
                                       element={Movies}
                                       movie={movie}
                                       onSave={handleSaveMovie}
                                       savedMovies={savedMovies}
                                       onDelete={handleDeleteMovie}
                                   />
                               </>}/>
                    <Route path='/saved-movies'
                           element={
                               <>
                                   <Header isMain={true} isLoggin={isLogin} openLinks={openLinks}/>
                                   <ProtectedRoute
                                       isLogin={isLogin}
                                       movie={movie}
                                       element={SavedMovies}
                                       onSave={handleSaveMovie}
                                       savedMovies={savedMovies}
                                       onDelete={handleDeleteMovie}
                                   />
                               </>
                           }/>
                    <Route path='/profile'
                           element={
                               <>
                                   <Header isMain={true} isLoggin={isLogin} openLinks={openLinks}/>
                                   <ProtectedRoute
                                       element={Profile}
                                       isLogin={isLogin}
                                       onSubmit={handleUpdateProfile}
                                       logout={handleLoguot}
                                   />
                               </>
                           }/>
                    <Route path='/signin' element={<Login handleLoginSubmit={handleLogin} isLogin={isLogin}/>}/>
                    <Route path='/signup' element={<Register handleRegisterSubmit={handleRegister}/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
                <Navigation isOpen={openMenu} closeLinks={closeLinks}/>
            </CurrentUserContext.Provider>
        </>
    )
}

