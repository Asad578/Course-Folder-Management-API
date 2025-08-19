import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './AssignmentTile.css'; // Use the same styles as assignments
import InstructorSideBar from './InstructorSideBar';
import { FiEdit, FiTrash } from 'react-icons/fi';

export default function InstExam() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examName, setExamName] = useState('');
  const [totalMarks, setTotalMarks] = useState('');

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

  // Handle "Add Exam" button click
  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  // Handle "Edit Exam" button click
  const handleEditClick = (exam) => {
    setIsEditModalOpen(true);
    setCurrentExam(exam);
    setExamName(exam.exam_name);
    setTotalMarks(exam.total_marks || '');
  };

  // Handle "Cancel" button click in modals
  const handleCancelClick = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setExamName('');
    setTotalMarks('');
  };

  // Handle "Create Exam" button click
  const handleCreateClick = async () => {
    if (!examName) {
      alert("Exam Name is required");
      return;
    }

    const examData = {
      exam_name: examName,
      course_id: folderId,
      ...(totalMarks && { total_marks: totalMarks }),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/exams/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(examData),
      });

      if (!response.ok) {
        throw new Error('Failed to create exam');
      }

      const data = await response.json();
      setExams([...exams, data]);
      handleCancelClick();
    } catch (error) {
      console.error('Error creating exam:', error);
    }
  };

  // Handle "Update Exam" button click
  const handleUpdateClick = async () => {
    const updatedExam = {
      ...currentExam,
      exam_name: examName,
      total_marks: totalMarks || null,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/exams/${currentExam.exam_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExam),
      });

      if (!response.ok) {
        throw new Error('Failed to update exam');
      }

      const data = await response.json();
      setExams(prevExams =>
        prevExams.map(exam =>
          exam.exam_id === data.exam_id ? data : exam
        )
      );
      setIsEditModalOpen(false);
      setExamName('');
      setTotalMarks('');
    } catch (error) {
      console.error('Error updating exam:', error);
    }
  };

  // Handle "Delete Exam" button click
  const handleDeleteClick = (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      fetch(`http://127.0.0.1:8000/api/exams/${examId}/`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setExams(prevExams =>
              prevExams.filter(exam => exam.exam_id !== examId)
            );
          } else {
            throw new Error('Failed to delete exam');
          }
        })
        .catch(error => console.error('Error deleting exam:', error));
    }
  };

  if (loading) {
    return <div>Loading exams...</div>;
  }

  return (
    <>
      <InstructorSideBar />
      <div className='dashboard'>
        <div className='main-heading'>
          <h1>{folder_name}</h1>
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Exams</h2>
          <button className='heading-btn' onClick={handleAddClick}>Create</button>
        </div>
        <div className='content'>
          <div className='tile-list'>
            {exams.length > 0 ? (
              exams.map((exam) => (
                <div key={exam.exam_id} className='tile-item'>
                  <div className='tile-clr'>
                  <Link to={`/instructor-programs/exams/examcontent/${exam.exam_id}/${folder_name}`}>
                      {exam.exam_name} Exam
                  </Link>
                  </div>
                  <div className='edit-delete-btn'>
                    <button className='delete-btn' onClick={() => handleDeleteClick(exam.exam_id)}>
                      <FiTrash className='delete-icon' />
                    </button>
                    <button className='edit-btn' onClick={() => handleEditClick(exam)}>
                      <FiEdit className='edit-icon' />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No exams found.</p>
            )}
          </div>
        </div>

        {/* Create Exam Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Exam</h3>
              <label>Exam Name: <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} required /></label>
              <label>Total Marks: <input type="number" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} /></label>
              <div className="modal-buttons">
                <button onClick={handleCancelClick}>Cancel</button>
                <button onClick={handleCreateClick}>Create</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Exam Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h4>Edit Exam</h4>
              <div>
                <label>Exam Name</label>
                <input
                  type="text"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
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
              <div className='modal-buttons'>
                <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
                <button className='update-btn' onClick={handleUpdateClick}>Update</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}