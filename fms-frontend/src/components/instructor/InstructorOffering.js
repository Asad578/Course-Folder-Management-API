import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./OfferingDetails.css";
import InstructorSideBar from "./InstructorSideBar";

function InstructorOffering() {
  const { offeringId, session } = useParams(); // Get offeringId and session from URL
  const [courseFolders, setCourseFolders] = useState([]); // State to store course folders
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
      fetch(`http://127.0.0.1:8000/api/offerings/${offeringId}/course-folders/`)
          .then((response) => response.json())
          .then((data) => {
              setCourseFolders(data);
              setLoading(false);
          })
          .catch((error) => {
              console.error('Error fetching course folders:', error);
              setLoading(false);
          });
  }, [offeringId]);


  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <InstructorSideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{session}</h1> {/* Display the session of the offering */}
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Course Folders</h2> {/* Updated heading */}
        </div>
        <div className="content"> 
            <div className="off-tile-list">
          {courseFolders.length > 0 ? (
            courseFolders.map((folder) => (
              <div key={folder.id} className='off-tile-item'>
                <Link to={`/instructor-programs/folders/${folder.id}/${folder.folder_name}`}>
                <div className='off-tile-clr'>
                    <h4>{folder.folder_name}</h4>
                    <p>{folder.credits} Credits | {session}</p>
                </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No course folders added.</p>
          )}
          </div>
        </div>
      </div>
    </>

  );
}

export default InstructorOffering;