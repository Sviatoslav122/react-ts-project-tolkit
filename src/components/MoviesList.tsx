import React from 'react';


function MoviesList() {
    return (
        <div className="Container-MovieList">
            <div className="clicker-top">
                <button className="clicker-button" id="Left-clicker" ></button>
                <button className="clicker-button" id="Right-clicker" ></button>

            </div>
            <div className="Container-Movies">
                <div className="click-movies-page">
                    <div className="Click-photo-page"></div>
                    <div className="Title-click-page"><p>Ferma Clarksona</p></div>

                   <div className="Stars-click-page"></div>
                </div>
            </div>

        </div>
    );
}

export default MoviesList;