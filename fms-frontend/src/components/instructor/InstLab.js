import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './AssignmentTile.css'; // You can use the same styles as assignments
import InstructorSideBar from './InstructorSideBar';
import { FiEdit, FiTrash } from 'react-icons/fi';

export default function InstLab() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentLab, setCurrentLab] = useState(null);
  const [labName, setLabName] = useState('');

  // Fetch labs based on folderId
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/folders/${folderId}/labs/`)
      .then(response => response.json())
      .then(data => {
        setLabs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching labs:', error);
        setLoading(false);
      });
  }, [folderId]);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleEditClick = (lab) => {
    setIsEditModalOpen(true);
    setCurrentLab(lab);
    setLabName(lab.name);
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setLabName('');
  };

  const handleCreateClick = async () => {
    if (!labName) {
      alert("Lab Name is required");
      return;
    }

    const labData = {
      name: labName,
      course_id: folderId,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/labs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(labData),
      });

      if (!response.ok) {
        throw new Error('Failed to create lab');
      }

      const data = await response.json();
      setLabs([...labs, data]);
      handleCancelClick();
    } catch (error) {
      console.error('Error creating lab:', error);
    }
  };

  const handleUpdateClick = async () => {
    const updatedLab = {
      ...currentLab,
      name: labName,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/labs/${currentLab.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLab),
      });

      if (!response.ok) {
        throw new Error('Failed to update lab');
      }

      const data = await response.json();
      setLabs((prevLabs) =>
        prevLabs.map((lab) =>
          lab.id === data.id ? data : lab
        )
      );
      setIsEditModalOpen(false);
      setLabName('');
    } catch (error) {
      console.error('Error updating lab:', error);
    }
  };

  const handleDeleteClick = (labId) => {
    if (window.confirm('Are you sure you want to delete this lab?')) {
      fetch(`http://127.0.0.1:8000/api/labs/${labId}/`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setLabs((prevLabs) =>
              prevLabs.filter((lab) => lab.id !== labId)
            );
          } else {
            throw new Error('Failed to delete lab');
          }
        })
        .catch((error) => console.error('Error deleting lab:', error));
    }
  };

  if (loading) {
    return <div>Loading labs...</div>;
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
          <h2>Labs</h2>
          <button className="heading-btn" onClick={handleAddClick}>
            Create
          </button>
        </div>
        <div className="content">
          <div className="tile-list">
            {labs.length > 0 ? (
              labs.map((lab) => (
                <div key={lab.id} className="tile-item">
                  <div className="tile-clr">
                  <Link to={`/instructor-programs/labs/labcontent/${lab.id}/${folder_name}`}>
                  {lab.name}
                  </Link>
                  </div>
                  <div className="edit-delete-btn">
                  <button
                      className="delete-btn"
                      onClick={() => handleDeleteClick(lab.id)}
                    >
                      <FiTrash className="delete-icon" />
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(lab)}
                    >
                      <FiEdit className="edit-icon" />
                    </button>
                    
                  </div>
                </div>
              ))
            ) : (
              <p>No labs found.</p>
            )}
          </div>
        </div>

        {/* Create Lab Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Lab</h3>
              <label>
                Lab Name:
                <input
                  type="text"
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                  required
                />
              </label>
              <div className="modal-buttons">
                <button onClick={handleCancelClick}>Cancel</button>
                <button onClick={handleCreateClick}>Create</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Lab Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h4>Edit Lab</h4>
              <div>
                <label>Lab Name</label>
                <input
                  type="text"
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
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
