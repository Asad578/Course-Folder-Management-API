import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../instructor/FolderTile.css';
import SideBar from './SideBar';

export default function STFolderDetails() {
  const { folderId, folder_name } = useParams(); // Get folderId and folder_name from URL

  return (
    <>
      <SideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1> 
        </div>
        <hr className="separator" />
        <div className="content">
          <div className='ff-tile-list'>
            <div className='ff-tile-item'>
              <Link to={`/student-courses/assignments/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Assignment</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/student-courses/quizzes/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Quiz</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/student-courses/labs/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Lab</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/student-courses/exams/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Exam</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/student-courses/grades/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Grade Sheet</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/student-courses/assessments/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Assessment</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/student-courses/attendance/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Attendance</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/student-courses/exams/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Course Material</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/student-courses/outline/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Outline</div></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
