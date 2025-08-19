import React from 'react'
import NoData from '../images/nodata.png';
import SideBar from './student/SideBar';


export default function CaseContent() {
  return (
    <>
    <SideBar/>
    <div className='dashboard'>
      <div className='heading'>
        <h2>Question</h2>
        <button className='heading-btn'>Upload</button>
      </div>
      <div className='content'>
        <div className='no-data'>
            <img src={NoData} alt="" />
        </div>
      </div>
      
    </div>
      
    </>
  )
}
