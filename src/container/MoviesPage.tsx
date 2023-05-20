import React from 'react';
import CustomStarRatings from "../components/StarRatings";

const MoviesPage = () => {

    // Отримання значень з параметрів запиту
    const searchParams = new URLSearchParams(window.location.search);
    const title = searchParams.get('title');
    const overview = searchParams.get('overview');
    const voteAverage = searchParams.get('vote_average') ? parseFloat(searchParams.get('vote_average')!) : 0;
    const poster_path = searchParams.get('poster_path');
    const genre_ids = searchParams.get('genre_ids');
    const genreNames = genre_ids?.split(','); // Розбиваємо рядок на масив назв жанрів
    const video_key = searchParams.get('video_key'); // Отримуємо ключ відео з параметрів запиту

    // Формуємо URL для вставки відео
    const videoUrl = video_key ? `https://www.youtube.com/watch?v=${video_key}` : '';

    return (
        <div className="moviespage-back">
            <div className="main-page-films" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})` }}>
                <div className="Left-container">
                    <div className="moviespage-title-films"><p className="bold-and-thick-text"> {title} </p></div>
                    <div className="container-star-genre">
                        <CustomStarRatings rating={voteAverage} />
                    </div>
                    <div className="description-film">{overview}</div>
                    {videoUrl && (
                        <div className="play-film">
                            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                                Play Film
                            </a>
                        </div>
                    )}
                </div>
                <div className="Right-container">
                    <div className="Genere-moviespage">
                        {genreNames && genreNames.map((genreName, index) => (
                            <h3 className="Genere" key={index}>{genreName}</h3>
                        ))}
                    </div>
                    <div className="triller-moviespage">
                        {videoUrl && (
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${video_key}`}
                                title="Movie Trailer"
                                // frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviesPage;
