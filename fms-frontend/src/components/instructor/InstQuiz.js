import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './AssignmentTile.css';
import InstructorSideBar from './InstructorSideBar';
import { FiEdit, FiTrash } from 'react-icons/fi';

export default function InstQuiz() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizNo, setQuizNo] = useState('');
  const [totalMarks, setTotalMarks] = useState('');

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

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleEditClick = (quiz) => {
    setIsEditModalOpen(true);
    setCurrentQuiz(quiz);
    setQuizNo(quiz.quiz_no);
    setTotalMarks(quiz.total_marks || '');
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setQuizNo('');
    setTotalMarks('');
  };

  const handleCreateClick = async () => {
    if (!quizNo) {
      alert("Quiz Number is required");
      return;
    }

    const quizData = {
      quiz_no: quizNo,
      course_id: folderId,
      ...(totalMarks && { total_marks: totalMarks }),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/quizzes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      if (!response.ok) {
        throw new Error('Failed to create quiz');
      }

      const data = await response.json();
      setQuizzes([...quizzes, data]);
      handleCancelClick();
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const handleUpdateClick = async () => {
    const updatedQuiz = {
      ...currentQuiz,
      quiz_no: quizNo,
      total_marks: totalMarks || null,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/quizzes/${currentQuiz.quiz_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuiz),
      });

      if (!response.ok) {
        throw new Error('Failed to update quiz');
      }

      const data = await response.json();
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz.quiz_id === data.quiz_id ? data : quiz
        )
      );
      setIsEditModalOpen(false);
      setQuizNo('');
      setTotalMarks('');
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  const handleDeleteClick = (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      fetch(`http://127.0.0.1:8000/api/quizzes/${quizId}/`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setQuizzes((prevQuizzes) =>
              prevQuizzes.filter((quiz) => quiz.quiz_id !== quizId)
            );
          } else {
            throw new Error('Failed to delete quiz');
          }
        })
        .catch((error) => console.error('Error deleting quiz:', error));
    }
  };

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  return (
    <>
      <InstructorSideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1>
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Quizzes</h2>
          <button className="heading-btn" onClick={handleAddClick}>
            Create
          </button>
        </div>
        <div className="content">
          <div className="tile-list">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div key={quiz.quiz_id} className="tile-item">
                  <div className="tile-clr">
                  <Link to={`/instructor-programs/quizzes/quizcontent/${quiz.quiz_id}/${folder_name}`}>
                    Quiz {quiz.quiz_no}
                  </Link>
                  </div>
                  <div className='edit-delete-btn'>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(quiz)}
                  >
                    <FiEdit className="edit-icon" />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(quiz.quiz_id)}
                  >
                    <FiTrash className="delete-icon" />
                  </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No quizzes found.</p>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Quiz</h3>
              <label>
                Quiz Number:
                <input
                  type="number"
                  value={quizNo}
                  onChange={(e) => setQuizNo(e.target.value)}
                  required
                />
              </label>
              <label>
                Total Marks:
                <input
                  type="number"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                />
              </label>
              <div className="modal-buttons">
                <button onClick={handleCancelClick}>Cancel</button>
                <button onClick={handleCreateClick}>Create</button>
              </div>
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h4>Edit Quiz</h4>
              <div>
                <label>Quiz Number</label>
                <input
                  type="text"
                  value={quizNo}
                  onChange={(e) => setQuizNo(e.target.value)}
                />
              </div>
              <div>
                <label>Total Marks (Optional)</label>
                <input
                  type="number"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                />
              </div>
              <div className="modal-buttons">
                <button className="cancel-btn" onClick={handleCancelClick}>
                  Cancel
                </button>
                <button className="update-btn" onClick={handleUpdateClick}>
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}