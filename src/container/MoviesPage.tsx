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

    return (
        <div className="moviespage-back">
            <div className="main-page-films" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})` }}>
                <div className="Left-container">
                    <div className="moviespage-title-films">{title}</div>
                    <div className="container-star-genre">
                        <CustomStarRatings rating={voteAverage} />
                    </div>
                    <div className="description-film">{overview}</div>
                    <div className="play-film">play-film</div>
                </div>
                <div className="Right-container">
                    <div className="Genere-moviespage">
                        <h3 className="Genere">{genre_ids}</h3>
                    </div>
                    <div className="triller-moviespage">triller-moviespage</div>
                </div>
            </div>
        </div>
    );
};

export default MoviesPage;
