import React from 'react'
import SideBar from './student/SideBar';
import AssignmentTile from './AssignmentTile';

export default function Assignments() {
  return (
    <>
    <SideBar/>
    <div className='dashboard'>
      <div className='heading'>
        <h2>Assignments</h2>
        <button className='heading-btn'>New</button>
      </div>
      <div className='content'>
        <AssignmentTile/>
      </div>
      
    </div>
      
    </>
  )
}
