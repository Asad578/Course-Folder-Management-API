import React from 'react'
import './AssignmentTile.css';
import { Link } from 'react-router-dom';

export default function AssignmentTile() {
    let tileItems = []

    tileItems = (
        <>
            <div className='tile-item'>
            <Link to='/assignmentcontent'><div className='tile-clr'>Assignment 1</div></Link>
            </div>
            <div className='tile-item'>
            <Link to='/assignmentcontent'><div className='tile-clr'>Assignment 2</div></Link>
            </div>
            <div className='tile-item'>
            <Link to='/assignmentcontent'><div className='tile-clr'>Assignment 3</div></Link>
            </div>
            <div className='tile-item'>
            <Link to='/assignmentcontent'><div className='tile-clr'>Assignment 4</div></Link>
            </div>
            
        </>

    );

  return (
    <>
    <div className='tile-list'>
        {tileItems}

    </div>
      
    </>
  )
}
