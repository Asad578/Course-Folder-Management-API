import React from 'react'
import './InstructorSideBar.css';
import { Link } from 'react-router-dom';

export default function InstructorSideBar(){
    let sideItems = [];

    sideItems = (
        <>
            <ul>
                <li>
                    <Link to='/instructor-dashboard'><div className="side-item">Dashboard</div></Link>
                    <Link to='/instructor-programs'><div className="side-item">Programs</div></Link>

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

