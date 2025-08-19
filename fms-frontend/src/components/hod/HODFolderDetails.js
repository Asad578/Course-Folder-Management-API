import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../instructor/FolderTile.css';
import HODSideBar from './HODSideBar';

export default function HODFolderDetails() {
  const { folderId, folder_name } = useParams(); // Get folderId and folder_name from URL

  return (
    <>
      <HODSideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1> 
        </div>
        <hr className="separator" />
        <div className="content">
          <div className='ff-tile-list'>
            <div className='ff-tile-item'>
              <Link to={`/hod-programs/assignments/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Assignment</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/hod-programs/quizzes/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Quiz</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/hod-programs/labs/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Lab</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/hod-programs/exams/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Exam</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/hod-programs/grades/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Grade Sheet</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/hod-programs/assessments/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Assessment</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/hod-programs/attendance/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Attendance</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/hod-programs/exams/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Course Material</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/hod-programs/outline/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Outline</div></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
