import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../instructor/FolderTile.css';
import HODSideBar from './HODSideBar';

export default function HODExam() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch exams based on folderId
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/folders/${folderId}/exams/`)
      .then(response => response.json())
      .then(data => {
        setExams(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching exams:', error);
        setLoading(false);
      });
  }, [folderId]);

  if (loading) {
    return <div>Loading exams...</div>;
  }

  return (
    <>
      <HODSideBar />
      <div className='dashboard'>
        <div className='main-heading'>
          <h1>{folder_name}</h1>
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Exams</h2>
        </div>
        <div className='content'>
          <div className='tile-list'>
            {exams.length > 0 ? (
              exams.map((exam) => (
                <div key={exam.exam_id} className='tile-item'>
                  <Link to={`/hod-programs/exams/examcontent/${exam.exam_id}/${folder_name}`}>
                    <div className='tile-clr'>
                      {exam.exam_name} Exam
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No exams found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}