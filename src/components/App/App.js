import React from 'react';
import {Routes, Route} from 'react-router-dom';


import './App.css';
import Main from '../Main/Main';
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import Navigation from "../Navigation/Navigation";
import NotFound from "../NotFound/NotFound";


export default function App() {
    const [openMenu, setOpenMenu] = React.useState(false);

    function openLinks() {
        setOpenMenu(true)
    }

    function closeLinks() {
        setOpenMenu(false)
    }

    return (
        <>
            <Routes>
                <Route path='/' element={<Main openLinks={openLinks}/>}/>
                <Route path='/movies' element={<Movies openLinks={openLinks}/>}/>
                <Route path='/saved-movies' element={<SavedMovies openLinks={openLinks}/>}/>
                <Route path='/profile' element={<Profile openLinks={openLinks}/>}/>
                <Route path='/signin' element={<Login/>}/>
                <Route path='/signup' element={<Register/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            <Navigation isOpen={openMenu} closeLinks={closeLinks}/>
        </>
    )
}
