import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Offerings.css';
import { FiEdit } from 'react-icons/fi';


export default function Offerings() {
  const { programId } = useParams(); // Capture the programId from the URL
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOffering, setCurrentOffering] = useState(null);
  const [session, setSession] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/program/${programId}/offerings/`) // Fetch offerings for the program
        .then((response) => response.json())
        .then((data) => {
            setOfferings(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching offerings:', error);
            setLoading(false);
        });
}, [programId]);

  // Function to open the edit modal with selected offering data
  const handleEditClick = (offering) => {
    setIsEditModalOpen(true);
    setCurrentOffering(offering);
    setSession(offering.session); // Set the initial value of the session
  };

  // Function to handle session change in input
  const handleSessionChange = (event) => {
    setSession(event.target.value);
  };

  // Function to handle cancel (close the modal)
  const handleCancelClick = () => {
    setIsEditModalOpen(false);
    setSession('');
  };

  // Function to handle update (save changes to the db)
  const handleUpdateClick = () => {
    const updatedOffering = {
      ...currentOffering,
      session: session
    };

    fetch(`http://127.0.0.1:8000/api/offerings/${currentOffering.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedOffering),
    })
      .then(response => response.json())
      .then(data => {
        // Update the offering list after successful update
        setOfferings((prevOfferings) =>
          prevOfferings.map((offering) =>
            offering.id === data.id ? data : offering
          )
        );
        setIsEditModalOpen(false);
        setSession('');
      })
      .catch((error) => console.error('Error updating offering:', error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='of-tile-list'>
      {offerings.map((offering) => (
        <div className='of-tile-item' key={offering.id}>
          <Link>
            <div className='of-tile-clr'>{offering.session}</div>
          </Link>
            <button className='edit-btn' onClick={() => handleEditClick(offering)}>
              <FiEdit className='edit-icon'></FiEdit>
            </button>
        </div>
      ))}

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Edit Offering</h4>
            <div>
              <label>Session</label>
              <input
                type="text"
                value={session}
                onChange={handleSessionChange}
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
  );
}

