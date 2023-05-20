import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Switch } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setDarkMode } from './themeSlice';
import './theme.less'
function Header() {
    const dispatch = useDispatch();
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);


    const onChange = (checked: boolean) => {
        dispatch(setDarkMode(checked));
        console.log('mode', darkMode)

    };

    return (
        <div className={`header ${darkMode ? 'dark' : 'light'}`} style={darkMode ? { background: 'black' } : { background : 'linear-gradient(to right, #0f0c29, #302b63, #24243e)'}}>
            <div className="buttons">
                <Switch defaultChecked={darkMode} onChange={onChange} />
                <Avatar size={64} icon={<UserOutlined />} />
            </div>

            <div className="nav-menu ">
                <NavLink to="/">
                    <h3 className="hover-3">Search</h3>
                </NavLink>
                <NavLink to="/movieslist">
                    <h3 className="hover-3">Movie List</h3>
                </NavLink>
            </div>
        </div>
    );
}


export default Header;