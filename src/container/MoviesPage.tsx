
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomStarRatings from "../components/StarRatings";

const MoviesPage = () => {
    const [movieTrailer, setMovieTrailer] = useState([])
    const [movieVideo, setMovieVideo] = useState([])

    const searchParams = new URLSearchParams(window.location.search);
    const title = searchParams.get('title');
    const overview = searchParams.get('overview');
    const voteAverage = searchParams.get('vote_average') ? parseFloat(searchParams.get('vote_average')!) : 0;
    const poster_path = searchParams.get('poster_path');
    const genre_ids = searchParams.get('genre_ids');
    const movieID = searchParams.get('movie_id');
    const genreNames = genre_ids?.split(',');

    useEffect(() => {
        movieID ?
            axios.get(
                `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=2ceecf640529ef207eecafa394b1c4d6`
            ).then((res) => {
                // @ts-ignore
                setMovieTrailer(res.data.results[0]?.key);
            }) :
            console.log('No Movie ID')

    }, []);

    useEffect(() => {
        movieID ?
            axios.get(
                `https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=2ceecf640529ef207eecafa394b1c4d6`
            ).then((res) => {
                // @ts-ignore
                setMovieVideo(res.data?.results?.CA?.link);
            }) :
            console.log('No Movie ID')
    }, []);

    return (
        <div className="moviespage-back">
            <div className="main-page-films" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})` }}>

                <div className="Left-container">
                    <div className="moviespage-title-films"><p className="bold-and-thick-text"> {title} </p></div>
                    <div className="container-star-genre">
                        <CustomStarRatings rating={voteAverage} />
                    </div>
                    <div className="description-film">{overview}</div>

                    {movieVideo && (
                        <div className="play-film">
                            {/*@ts-ignore*/}
                            <a href={movieVideo} target="_blank" rel="noopener noreferrer">
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
                        {movieTrailer && (
                            <iframe
                                width="250"
                                height="200"
                                src={`https://www.youtube.com/embed/${movieTrailer}`}
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
