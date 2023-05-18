import React from 'react';


function Dashboard() {
    return (
        <div className="dashboard">

            <div className="dashboard-info">
                <h1>Watch our films</h1>
                <p>Enter keywords</p>
                <div className="searchBox">
                    <input className="searchInput" type="text" name="" placeholder="Search" />
                    <button className="searchButton" >
                        <i className="material-icons">
                            search
                        </i>
                    </button>
                </div>



            </div>

        </div>
    );
}

export default Dashboard;