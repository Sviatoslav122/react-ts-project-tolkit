import React, { useState } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { NavLink } from 'react-router-dom';
import CustomStarRatings from './StarRatings';

interface Movie {
    original_title: string;
    title: string;
    overview: string;
    vote_average: number;
    poster_path: string;
    genre_ids: number[];
    id: number;
}

const options = { method: 'GET', headers: { accept: 'application/json' } };

function Dashboard() {
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);
    const [searchedMovie, setSearchedMovie] = useState<string>('');
    const [findedMovie, setFindedMovie] = useState<Movie[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSearchMovie = () => {
        showModal();

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=2ceecf640529ef207eecafa394b1c4d6&query=${searchedMovie}`, options)
            .then((res) => res.json())
            .then((json) => {
                console.log(json.results);
                setFindedMovie(json.results);
            })
            .catch((err) => console.error('error:' + err));

        // setSearchedMovie('')
    };

    return (
        <div className="dashboard" style={darkMode ? { background: '#000' } : {}}>
            <div className="dashboard-info">
                <h1>Watch our films</h1>
                <p>Enter keywords</p>
                <div className="searchBox">
                    <input
                        className="searchInput"
                        type="text"
                        name=""
                        placeholder="Search"
                        onChange={(e) => {
                            setSearchedMovie(e.target.value);
                            console.log(searchedMovie);
                        }}
                    />
                    <button className="searchButton" onClick={handleSearchMovie}>
                        <i className="material-icons">search</i>
                    </button>
                </div>
            </div>


            <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {findedMovie.length > 0 ? (
                    <NavLink
                        to={`../container/MoviesPage?title=${findedMovie[0].title}
                        &overview=${findedMovie[0].overview}
                        &vote_average=${findedMovie[0].vote_average}
                        &poster_path=${findedMovie[0].poster_path}
                        &genre_ids=${findedMovie[0].genre_ids}
                        &movie_id=${findedMovie[0].id}
                        `}
                    >
                        <div className="click-movies-page">
                            <div className="Click-photo-page">
                                <img
                                    className="Movies-img"
                                    src={`https://image.tmdb.org/t/p/w500/${findedMovie[0].poster_path}`}
                                    alt={findedMovie[0].original_title}
                                />
                            </div>
                            <div className="Title-click-page" style={{ color: 'white' }}>
                                {findedMovie[0].original_title}
                            </div>
                            <div className="Stars-click-page">
                                <CustomStarRatings rating={findedMovie[0].vote_average} />
                            </div>
                        </div>
                    </NavLink>
                ) : (
                    <div>No movie</div>
                )}
            </Modal>
        </div>
    );
}

export default Dashboard;
