import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setReduxMovies, setVideos } from '../store/moviesSlice';
import CustomStarRatings from './StarRatings';


function MoviesList() {
    const [page, setPage] = useState(1); // Поточна сторінка
    const [totalPages, setTotalPages] = useState(0); // Загальна кількість сторінок
    const movies = useSelector((state: RootState) => state.movies.value);
    const dispatch = useDispatch();

    useEffect(() => {
        // Отримання списку фільмів з API
        const fetchMovies = async () => {
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

        fetchMovies();
    }, [page, dispatch]);

    const fetchVideos = async (movieId: number) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2ceecf640529ef207eecafa394b1c4d6`
            );
            const videos = response.data.results;
            dispatch(setVideos({ movieId, videos }));
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

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
                    movies.map((elem) => (
                        <NavLink
                            to={`../container/MoviesPage?title=${elem.title}
                            &overview=${elem.overview}
                           &vote_average=${elem.vote_average}
                            &poster_path=${elem.poster_path}
                            &genre_ids=${elem.genre_ids}`}
                            key={elem.id}
                            onClick={() => fetchVideos(elem.id)}
                        >
                            <div className="click-movies-page">
                                <div className="Click-photo-page">
                                    <img className="Movies-img" src={`https://image.tmdb.org/t/p/w500/${elem.poster_path}`} alt={elem.original_title} />
                                </div>
                                <div className="Title-click-page" style={{ color: 'white' }}>{elem.original_title}</div>
                                <div className="Stars-click-page">
                                    <CustomStarRatings rating={elem.vote_average} />
                                </div>
                                </div>

                        </NavLink>
                    ))
                ) : (
                    <div>No movies found.</div>
                )}
            </div>
        </div>
    );
}

export default MoviesList;
