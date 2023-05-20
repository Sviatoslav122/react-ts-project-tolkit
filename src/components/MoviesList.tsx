import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setReduxMovies } from '../store/moviesSlice';
import CustomStarRatings from './StarRatings';

interface Genre {
    id: number;
    name: string;
}

function MoviesList() {
    const [page, setPage] = useState(1); // Поточна сторінка
    const [totalPages, setTotalPages] = useState(0); // Загальна кількість сторінок
    const [genres, setGenres] = useState<Genre[]>([]); // Список жанрів
    const movies = useSelector((state: RootState) => state.movies.value);
    const dispatch = useDispatch();

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
                console.error('Error fetching movies:', error);
            }
        };

        getMovies();
    }, [page, dispatch]);

    useEffect(() => {
        // Отримання списку жанрів з API
        const getGenres = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/genre/movie/list?api_key=2ceecf640529ef207eecafa394b1c4d6'
                );
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        getGenres();
    }, []);

    useEffect(() => {
        // Отримання ключів відео для кожного фільму
        const getMovieVideos = async () => {
            try {
                const updatedMovies = await Promise.all(
                    movies.map(async (elem) => {
                        const response = await axios.get(
                            `https://api.themoviedb.org/3/movie/${elem.id}/videos?api_key=2ceecf640529ef207eecafa394b1c4d6`
                        );
                        const videoKey = response.data.results[0]?.key || ''; // Отримати перший ключ відео (якщо є)
                        return {
                            ...elem,
                            videoKey: videoKey
                        };
                    })
                );

                dispatch(setReduxMovies(updatedMovies));
            } catch (error) {
                console.error('Error fetching movie videos:', error);
            }
        };

        if (movies && movies.length > 0) {
            getMovieVideos();
        }
    }, [movies, dispatch]);

    const handlePrevious = () => {
        // Логіка для перегортування сторінок назад
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        // Логіка для перегортування сторінок вперед
        if (page < totalPages) {
            setPage(page + 1);
        }
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
                            .join(', '); // Об'єднати назви жанрів розділеними комами

                        return (
                            <NavLink
                                to={`../container/MoviesPage?title=${elem.title}
                &overview=${elem.overview}
                &vote_average=${elem.vote_average}
                &poster_path=${elem.poster_path}
                &video_key=${elem.videoKey}
                &genre_ids=${genreNames}`} // Передати назви жанрів замість ідентифікаторів
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
                                    <div className="Genres-click-page">

                                    </div>
                                    <div className="Stars-click-page">
                                        <CustomStarRatings rating={elem.vote_average} />
                                    </div>
                                </div>
                            </NavLink>
                        );
                    })
                ) : (
                    <div>No movies found.</div>
                )}
            </div>
        </div>
    );
}

export default MoviesList;
