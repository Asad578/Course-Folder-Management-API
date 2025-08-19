import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../instructor/FolderTile.css';
import SideBar from './SideBar';

export default function StAssignment() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch assignments based on folderId
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/folders/${folderId}/assignments/`)
      .then(response => response.json())
      .then(data => {
        setAssignments(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching assignments:', error);
        setLoading(false);
      });
  }, [folderId]);

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  return (
    <>
      <SideBar />
      <div className='dashboard'>
        <div className='main-heading'>
          <h1>{folder_name}</h1> 
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Assignments</h2>
        </div>
        <div className='content'>
          <div className='tile-list'>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <div key={assignment.assignment_id} className='tile-item'>
                  <Link to={`/student-courses/assignments/assignmentcontent/${assignment.assignment_id}/${folder_name}`}>
                    <div className='tile-clr'>
                      Assignment {assignment.assignment_no}
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No assignments found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}