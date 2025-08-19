import React from 'react'
import SideBar from './student/SideBar'
import SixCases from './SixCases'

export default function AssignmentContent() {
  return (
    <>
    <SideBar/>
    <div className='dashboard'>
      <div className='heading'>
        <h2>Assignment 1</h2>
      </div>
      <div className='content'>
        <SixCases/>
      </div>
      
    </div>
      
    </>
  )
}
