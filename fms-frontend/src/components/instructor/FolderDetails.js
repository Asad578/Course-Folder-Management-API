import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './FolderTile.css';
import InstructorSideBar from './InstructorSideBar';

export default function FolderDetails() {
  const { folderId, folder_name } = useParams(); // Get folderId and folder_name from URL

  return (
    <>
      <InstructorSideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1> 
        </div>
        <hr className="separator" />
        <div className="content">
          <div className='ff-tile-list'>
            <div className='ff-tile-item'>
              <Link to={`/instructor-programs/assignments/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Assignment</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/instructor-programs/quizzes/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Quiz</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/instructor-programs/labs/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Lab</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/instructor-programs/exams/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Exam</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/instructor-programs/grades/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Grade Sheet</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/instructor-programs/assessments/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Assessment</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/instructor-programs/attendance/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Attendance</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/instructor-programs/exams/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Course Material</div></Link>
            </div>
            <div className='ff-tile-item'>
              <Link to={`/instructor-programs/outline/${folderId}/${folder_name}`}><div className='ff-tile-clr'>Outline</div></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
