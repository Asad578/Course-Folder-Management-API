import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './AssignmentTile.css';
import InstructorSideBar from './InstructorSideBar';
import { FiEdit, FiTrash } from 'react-icons/fi';

export default function InstAssignment() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignmentNo, setAssignmentNo] = useState('');
  const [totalMarks, setTotalMarks] = useState('');

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

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleEditClick = (assignment) => {
    setIsEditModalOpen(true);
    setCurrentAssignment(assignment);
    setAssignmentNo(assignment.assignment_no);
    setTotalMarks(assignment.total_marks || '');
  };

  const handleCancelClick = () => {
    setIsEditModalOpen(false);
    setIsModalOpen(false);
    setAssignmentNo('');
    setTotalMarks('');
  };

  const handleCreateClick = async () => {
    if (!assignmentNo) {
      alert("Assignment Number is required");
      return;
    }

    const assignmentData = {
      assignment_no: assignmentNo,
      course_id: folderId,
      ...(totalMarks && { total_marks: totalMarks })
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/assignments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignmentData)
      });

      if (!response.ok) {
        throw new Error('Failed to create assignment');
      }

      const data = await response.json();
      setAssignments([...assignments, data]);
      handleCancelClick();
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  const handleUpdateClick = () => {
    const updatedAssignment = {
      ...currentAssignment,
      assignment_no: assignmentNo,
      total_marks: totalMarks || null
    };

    fetch(`http://127.0.0.1:8000/api/assignments/${currentAssignment.assignment_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAssignment),
    })
      .then(response => response.json())
      .then(data => {
        setAssignments(prevAssignments =>
          prevAssignments.map(assignment =>
            assignment.assignment_id === data.assignment_id ? data : assignment
          )
        );
        setIsEditModalOpen(false);
        setAssignmentNo('');
        setTotalMarks('');
      })
      .catch(error => console.error('Error updating assignment:', error));
  };

  const handleDeleteClick = (assignmentId) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      fetch(`http://127.0.0.1:8000/api/assignments/${assignmentId}/`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setAssignments(prevAssignments =>
              prevAssignments.filter(assignment => assignment.assignment_id !== assignmentId)
            );
          } else {
            throw new Error('Failed to delete assignment');
          }
        })
        .catch(error => console.error('Error deleting assignment:', error));
    }
  };

  if (loading) {
    return <div>Loading assignments...</div>;
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
          <h2>Assignments</h2>
          <button className='heading-btn' onClick={handleAddClick}>Create</button>
        </div>
        <div className='content'>
          <div className='tile-list'>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <div key={assignment.assignment_id} className='tile-item'>
                  <div className='tile-clr'>
                  <Link to={`/instructor-programs/assignments/assignmentcontent/${assignment.assignment_id}/${folder_name}`}>
                      Assignment {assignment.assignment_no}
                  </Link>
                  </div>
                  <div className='edit-delete-btn'>
                  <button className='delete-btn' onClick={() => handleDeleteClick(assignment.assignment_id)}>
                    <FiTrash className='delete-icon' />
                  </button>
                  <button className='edit-btn' onClick={() => handleEditClick(assignment)}>
                    <FiEdit className='edit-icon' />
                  </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No assignments found.</p>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Assignment</h3>
              <label>Assignment Number: <input type="number" value={assignmentNo} onChange={(e) => setAssignmentNo(e.target.value)} required /></label>
              <label>Total Marks: <input type="number" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} /></label>
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
              <h4>Edit Assignment</h4>
              <div>
                <label>Assignment Number</label>
                <input
                  type="text"
                  value={assignmentNo}
                  onChange={(e) => setAssignmentNo(e.target.value)}
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