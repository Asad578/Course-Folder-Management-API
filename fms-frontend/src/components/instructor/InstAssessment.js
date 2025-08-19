import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './AssignmentTile.css'; // Reusing styles
import InstructorSideBar from './InstructorSideBar';
import { FiEdit, FiTrash } from 'react-icons/fi';

export default function InstAssessment() {
  const { folderId, folder_name } = useParams();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [assessmentName, setAssessmentName] = useState('');

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

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleEditClick = (assessment) => {
    setIsEditModalOpen(true);
    setCurrentAssessment(assessment);
    setAssessmentName(assessment.assessment_name);
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setAssessmentName('');
  };

  const handleCreateClick = async () => {
    if (!assessmentName) {
      alert("Assessment Name is required");
      return;
    }

    const assessmentData = {
      assessment_name: assessmentName,
      course_id: folderId,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/assessments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessmentData),
      });

      if (!response.ok) throw new Error('Failed to create assessment');

      const data = await response.json();
      setAssessments([...assessments, data]);
      handleCancelClick();
    } catch (error) {
      console.error('Error creating assessment:', error);
    }
  };

  const handleUpdateClick = async () => {
    if (!currentAssessment) return;

    const updatedAssessment = { ...currentAssessment, assessment_name: assessmentName };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/assessments/${currentAssessment.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAssessment),
      });

      if (!response.ok) throw new Error('Failed to update assessment');

      const data = await response.json();
      setAssessments(prev =>
        prev.map(assessment => (assessment.id === data.id ? data : assessment))
      );
      handleCancelClick();
    } catch (error) {
      console.error('Error updating assessment:', error);
    }
  };

  const handleDeleteClick = (assessmentId) => {
    if (window.confirm("Are you sure you want to delete this assessment?")) {
      fetch(`http://127.0.0.1:8000/api/assessments/${assessmentId}/`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) throw new Error('Failed to delete assessment');

          setAssessments(prev => prev.filter(assessment => assessment.id !== assessmentId));
        })
        .catch(error => console.error('Error deleting assessment:', error));
    }
  };

  if (loading) return <div>Loading assessments...</div>;

  return (
    <>
      <InstructorSideBar />
      <div className='dashboard'>
        <div className='main-heading'>
          <h1>{folder_name}</h1>
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Assessments</h2>
          <button className='heading-btn' onClick={handleAddClick}>Create</button>
        </div>
        <div className='content'>
          <div className='tile-list'>
            {assessments.length > 0 ? (
              assessments.map(assessment => (
                <div key={assessment.id} className='tile-item'>
                  <div className='tile-clr'>
                  <Link to={`/instructor-programs/assessments/assessmentcontent/${assessment.id}/${folder_name}`}>
                  {assessment.assessment_name}
                  </Link>
                  </div>
                  <div className='edit-delete-btn'>
                    <button className='delete-btn' onClick={() => handleDeleteClick(assessment.id)}>
                      <FiTrash className='delete-icon' />
                    </button>
                    <button className='edit-btn' onClick={() => handleEditClick(assessment)}>
                      <FiEdit className='edit-icon' />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No assessments found.</p>
            )}
          </div>
        </div>

        {/* Create Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Assessment</h3>
              <label>
                Assessment Name:
                <input type="text" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)} required />
              </label>
              <div className="modal-buttons">
                <button onClick={handleCancelClick}>Cancel</button>
                <button onClick={handleCreateClick}>Create</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Edit Assessment</h3>
              <label>
                Assessment Name:
                <input type="text" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)} required />
              </label>
              <div className="modal-buttons">
                <button onClick={handleCancelClick}>Cancel</button>
                <button onClick={handleUpdateClick}>Update</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
