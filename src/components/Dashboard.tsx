import React from 'react';
import {Input} from "antd";

function Dashboard() {
    return (
        <div className="dashboard">

            <div className="dashboard-info">
                <h1>Watch our films</h1>
                <p>Description</p>
                <Input placeholder="Write your film" />
            </div>

        </div>
    );
}

export default Dashboard;