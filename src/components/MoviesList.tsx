import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setReduxMovies } from '../store/moviesSlice';
import CustomStarRatings from './StarRatings';
import {setDarkMode} from "./themeSlice";

interface Genre {
    id: number;
    name: string;
}

function MoviesList(darkMode: React.CSSProperties | undefined) {
    const [page, setPage] = useState(1); // Поточна сторінка
    const [totalPages, setTotalPages] = useState(0); // Загальна кількість сторінок
    const [genres, setGenres] = useState<Genre[]>([]); // Список жанрів
    const movies = useSelector((state: RootState) => state.movies.value);
    const dispatch = useDispatch();
    const onChange = (checked: boolean) => {
        dispatch(setDarkMode(checked));
        console.log('mode', darkMode)

    };
    useEffect(() => {
        // Отримання списку фільмів з API
        const getMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=2ceecf640529ef207eecafa394b1c4d6&page=${page}`
                );
                dispatch(setReduxMovies(response.data.results));
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error('Помилка отримання фільмів:', error);
            }
        };

        console.log(movies)

        getMovies();
    }, [page]);

    useEffect(() => {
        // Отримання списку жанрів з API
        const getGenres = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/genre/movie/list?api_key=2ceecf640529ef207eecafa394b1c4d6'
                );
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Помилка отримання жанрів:', error);
            }
        };

        getGenres();
    }, []);

    const handlePrevious = () => {
        // Логіка для переключення на попередню сторінку
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const handleNext = () => {
        // Логіка для переключення на наступну сторінку
        setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
    };


    return (

        <div className="Container-MovieList">
            <div className="clicker-top">
                <button className="clicker-button" id="Left-clicker" onClick={handlePrevious}></button>
                <button className="clicker-button" id="Right-clicker" onClick={handleNext}></button>
            </div>

            <div className="Container-Movies">
                {movies ? (
                    movies.map((elem) => {
                        const genreNames = elem.genre_ids
                            .map((genreId: number) => genres.find((genre: Genre) => genre.id === genreId)?.name)
                            .filter(Boolean)
                            .join(', ');

                        return (
                            <NavLink
                                to={`../container/MoviesPage?title=${elem.title}
                                &overview=${elem.overview}
                                &vote_average=${elem.vote_average}
                                &poster_path=${elem.poster_path}
                                &genre_ids=${genreNames}
                                &movie_id=${elem.id}`}
                                key={elem.id}
                            >
                                <div className="click-movies-page">
                                    <div className="Click-photo-page">
                                        <img
                                            className="Movies-img"
                                            src={`https://image.tmdb.org/t/p/w500/${elem.poster_path}`}
                                            alt={elem.original_title}
                                        />
                                    </div>
                                    <div className="Title-click-page" style={{ color: 'white' }}>
                                        {elem.original_title}
                                    </div>
                                    <div className="Genres-click-page">{genreNames}</div>
                                    <div className="Stars-click-page">
                                        <CustomStarRatings rating={elem.vote_average} />
                                    </div>
                                </div>
                            </NavLink>
                        );
                    })
                ) : (
                    <div>Фільми не знайдені.</div>
                )}
            </div>
        </div>
    );
}

export default MoviesList;