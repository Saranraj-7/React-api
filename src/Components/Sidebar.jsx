import React from 'react';
import Id from './Id';
import Name from './Name';
import Email from './Email';
import Fetchdata from './Fetchdata';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-items">
            <NavLink to="/" className='fs-5 d-flex justify-content-center pb-3 text-decoration-none text-black' >
                Dashboard
            </NavLink>
                <div className="sidebar-item">
                    <Id/>
                </div>
                <div className="sidebar-item">
                    <Name/>
                </div>
                <div className="sidebar-item">
                    <Email/>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
