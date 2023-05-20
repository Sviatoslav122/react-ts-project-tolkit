import React from 'react';
import MoviesList from "./components/MoviesList";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import MoviesPage from "./container/MoviesPage";


function App() {
    return (
        <>
            <BrowserRouter>

                <Header />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="movieslist" element={<MoviesList />} />
                    <Route path="container/moviespage" element={<MoviesPage/>} />


                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
