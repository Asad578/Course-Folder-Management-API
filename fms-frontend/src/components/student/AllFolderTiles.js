import React from 'react'
import './StudentDashboard.css';
import SideBar from './SideBar';
import FolderTile from './FolderTile';

export default function AllFolderTiles() {
  return (
    <>
    <SideBar/>
    <div className='dashboard'>
      <div className='heading'>
        <h2>Folders</h2>
        <button className='heading-btn'>New</button>
      </div>
      <div className='content'>
        <FolderTile/>
      </div>
      
    </div>
      
    </>
  )
}
