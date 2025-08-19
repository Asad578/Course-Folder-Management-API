import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../instructor/InstCourseOutline.css";
import SideBar from "./SideBar";

export default function StAssignmentContent() {
  const { assignmentId, folder_name } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileTypes = ["question", "solution"];

  // Fetch assignment details
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/assignments/${assignmentId}/`)
      .then((response) => response.json())
      .then((data) => {
        setAssignment(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assignment:", error);
        setLoading(false);
      });
  }, [assignmentId]);
  if (loading) return <div>Loading assignment details...</div>;

  return (
    <>
      <SideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1>
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Assignment {assignment.assignment_no}</h2>
        </div>
        <div className="content">
          {fileTypes.map((type) => (
            <div key={type} className="file-section">
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              {assignment[type] ? (
                <div className="ot-tile-item">
                <div className="ot-tile-clr">
                  <a href={assignment[type]} target="_blank" rel="noopener noreferrer">
                    {assignment[type].split("/").pop()}
                  </a>
                  </div>
                </div>
              ) : (
                <p>No File uploaded</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
