import React, {useEffect,  } from 'react';
import axios from 'axios';
import {NavLink} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setReduxMovies } from '../store/moviesSlice';


function MoviesList() {
    const movies = useSelector((state: RootState) => state.movies.value)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=2ceecf640529ef207eecafa394b1c4d6').then((res) => {
            dispatch(setReduxMovies(res.data.results))
        })
    }, [])

    return (
        <div className="Container-MovieList">
            <div className="clicker-top">
                <button className="clicker-button" id="Left-clicker" ></button>
                <button className="clicker-button" id="Right-clicker" ></button>
            </div>


            <div className="Container-Movies">
                {
                    movies ?
                        movies.map((elem) => {
// src={`https://image.tmdb.org/t/p/w500/${elem.backdrop_path}`}
                            console.log(elem)
                            return (
                                <h1 key={elem.id} style={{color: 'blue'}}>
                                    {elem.original_title}
                                </h1>
                            )
                        }) :
                        null
                }


                <NavLink to="../container/MoviesPage">
                    <div className="click-movies-page">
                        <div className="Click-photo-page">
                            <Outlet />
                        </div>
                        <div className="Title-click-page"><p>Ferma Clarksona</p></div>

                        <div className="Stars-click-page"></div>
                    </div> </NavLink>
            </div>

        </div>
    );
}

export default MoviesList;