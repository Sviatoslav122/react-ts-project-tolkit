import React from 'react';

import {NavLink} from "react-router-dom";
import{Outlet} from "react-router-dom";

function MoviesList() {
    return (
        <div className="Container-MovieList">
            <div className="clicker-top">
                <button className="clicker-button" id="Left-clicker" ></button>
                <button className="clicker-button" id="Right-clicker" ></button>

            </div>

            <div className="Container-Movies">
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