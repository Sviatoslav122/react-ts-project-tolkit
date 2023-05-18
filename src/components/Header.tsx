import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Switch } from 'antd';
import {NavLink} from "react-router-dom";

function Header() {
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    return (
        <div className='header'>
            <div className='buttons'>
                <Switch defaultChecked onChange={onChange} />
                <Avatar size={64} icon={<UserOutlined />} />
            </div>
            <div className='nav-menu'>
                <NavLink to="/">
                    <h3 className="hover-3">Dashboard</h3>
                </NavLink>
                <NavLink to="/movieslist">
                    <h3 className="hover-3">Movie List</h3>
                </NavLink>
            </div>
        </div>
    );
}

export default Header;