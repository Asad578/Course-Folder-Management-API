import React from 'react'
import './SideBar.css';
import { Link } from 'react-router-dom';

export default function SideBar(){
    let sideItems = [];

    sideItems = (
        <>
            <ul>
                <li>
                    <div className="side-item"><Link to='/student-dashboard'>Dashboard</Link></div>
                </li>
                <li>
                    <div className="side-item"><Link to='/allcourses'>My Courses</Link></div>
                </li>
            </ul>
        </>
    );

    return (
      <>
        <div className="side-bar">
            <div className="side-items">
                {sideItems}
            </div>
            
            <div className='logout-container'>
                <hr className='separator'/>
                <div>
                    <button className='logout-btn'>Logout</button>
                </div>

            </div>
        </div>
       
      </>
    )
}

