import React from 'react';
import { FaAngleRight } from "react-icons/fa";
import './UserForm.css';
import Accordion from 'react-bootstrap/Accordion';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-items">
                <div className="sidebar-item">Dashboard</div>
                <div className="sidebar-item ">Id</div>
                <div className="sidebar-item">Name</div>
                <div className="sidebar-item">Email</div>
                <div className="sidebar-item">Gender</div>
                <div className="sidebar-item">Status</div>
            </div>
        </div>
    );
}

export default Sidebar;
