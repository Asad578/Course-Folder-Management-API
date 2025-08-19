import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../instructor/FolderTile.css';
import SideBar from './SideBar';

export default function STLab() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading labs...</div>;
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
          <h2>Labs</h2>
        </div>
        <div className="content">
          <div className="tile-list">
            {labs.length > 0 ? (
              labs.map((lab) => (
                <div key={lab.id} className="tile-item">
                  <Link to={`/student-courses/labs/labcontent/${lab.id}/${folder_name}`}>
                  <div className="tile-clr">{lab.name}</div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No labs found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
