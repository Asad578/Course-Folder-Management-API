import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../instructor/FolderTile.css';
import SideBar from './SideBar';

export default function STQuiz() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch quizzes based on folderId
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/folders/${folderId}/quizzes/`)
      .then(response => response.json())
      .then(data => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
        setLoading(false);
      });
  }, [folderId]);

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  return (
    <>
      <SideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1>
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Quizzes</h2>
        </div>
        <div className="content">
          <div className="tile-list">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div key={quiz.quiz_id} className="tile-item">
                  <Link
                    to={`/student-courses/quizzes/quizcontent/${quiz.quiz_id}/${folder_name}`}
                  >
                    <div className="tile-clr">Quiz {quiz.quiz_no}</div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No quizzes found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}