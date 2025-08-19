import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../instructor/FolderTile.css';
import HODSideBar from './HODSideBar';

export default function HODAssessment() {
  const { folderId, folder_name } = useParams();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/folders/${folderId}/assessments/`)
      .then(response => response.json())
      .then(data => {
        setAssessments(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching assessments:', error);
        setLoading(false);
      });
  }, [folderId]);

  if (loading) return <div>Loading assessments...</div>;

  return (
    <>
      <HODSideBar />
      <div className='dashboard'>
        <div className='main-heading'>
          <h1>{folder_name}</h1>
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Assessments</h2>
        </div>
        <div className='content'>
          <div className='tile-list'>
            {assessments.length > 0 ? (
              assessments.map(assessment => (
                <div key={assessment.id} className='tile-item'>
                  <Link to={`/hod-programs/assessments/assessmentcontent/${assessment.id}/${folder_name}`}>
                  <div className='tile-clr'>{assessment.assessment_name}</div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No assessments found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
