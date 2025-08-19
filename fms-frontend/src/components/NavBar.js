import './NavBar.css';
import React from 'react'
import logo from '../images/riphahlogo.png';
import { Link } from 'react-router-dom';


export default function NavBar() {
    let menuItems = [];

    menuItems = (
        <>
            <div className="menu-item"><Link to='/'>Profile</Link></div>
            <div className="menu-item"><Link to='/'>Alumni</Link></div>
            <div className="menu-item"><Link to='/'>Enrollment</Link></div>
            <div className="menu-item"><Link to='/'>Attendance</Link></div>
            <div className="menu-item"><Link to='/'>Courses</Link></div>
            <div className="menu-item"><Link to='/'>Projects</Link></div>
            <div className="menu-item"><Link to='/'>Events</Link></div>
        </>
    );
  return (
    <>
        <div className="top-menu-bar">
            <div className="menu-logo" style={{ backgroundImage: `url(${logo})` }}></div>
            <div className="menu-items">
                {menuItems}
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <span className="search-icon"></span>
            </div>
            
        </div>

    </>
  )
}
