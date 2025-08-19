import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../instructor/InstCourseOutline.css";
import SideBar from "./SideBar";

export default function StAssessmentContent() {
  const { assessmentId, folder_name } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileTypes = ["question", "solution"];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/assessments/${assessmentId}/`)
      .then(response => response.json())
      .then(data => {
        setAssessment(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching assessment:", error);
        setLoading(false);
      });
  }, [assessmentId]);
  if (loading) return <div>Loading assessment details...</div>;

  return (
    <>
      <SideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1>
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Assessment {assessment.assessment_name}</h2>
        </div>
        <div className="content">
          {fileTypes.map(type => (
            <div key={type} className="file-section">
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              {assessment[type] ? (
                <div className="ot-tile-item">
                  <div className="ot-tile-clr">
                    <a href={assessment[type]} target="_blank" rel="noopener noreferrer">
                      {assessment[type].split("/").pop()}
                    </a>
                  </div>
                </div>
              ) : (
                <p>No file Uploaded</p>
              )}
            </div>
          ))}
        </div>
      </div>
          </>
  );
}
