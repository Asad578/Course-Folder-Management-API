import React from 'react'
import './FolderTile.css';
import { Link } from 'react-router-dom';

export default function FolderTile() {
    let tileItems = []

    tileItems = (
        <>
            <div className='ff-tile-item'>
            <Link to='/assignments'><div className='ff-tile-clr'>Assignment</div></Link>
            </div>
            <div className='ff-tile-item'>
            <a href='/'><div className='ff-tile-clr'>Quiz</div></a>
            </div>
            <div className='ff-tile-item'>
            <a href='/'><div className='ff-tile-clr'>Lab</div></a>
            </div>
            <div className='ff-tile-item'>
            <a href='/'><div className='ff-tile-clr'>Exam</div></a>
            </div>
            <div className='ff-tile-item'>
            <a href='/'><div className='ff-tile-clr'>Grade Sheet</div></a>
            </div>
            <div className='ff-tile-item'>
            <a href='/'><div className='ff-tile-clr'>Assessment</div></a>
            </div>
            <div className='ff-tile-item'>
            <a href='/'><div className='ff-tile-clr'>Attendance</div></a>
            </div>
            <div className='ff-tile-item'>
            <a href='/'><div className='ff-tile-clr'>Course Material</div></a>
            </div>
            <div className='ff-tile-item'>
            <a href='/'><div className='ff-tile-clr'>Outline</div></a>
            </div>
        </>

    );

  return (
    <>
    <div className='ff-tile-list'>
        {tileItems}

    </div>
      
    </>
  )
}
