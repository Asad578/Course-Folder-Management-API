import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../instructor/InstCourseOutline.css";
import HODSideBar from "./HODSideBar";

export default function HODExamContent() {
  const { examId, folder_name } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileTypes = ["question", "solution", "best", "average", "worst"];

  // Fetch exam details
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/exams/${examId}/`)
      .then((response) => response.json())
      .then((data) => {
        setExam(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching exam:", error);
        setLoading(false);
      });
  }, [examId]);
  if (loading) return <div>Loading exam details...</div>;

  return (
    <>
      <HODSideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1>
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>{exam.exam_name}</h2>
        </div>
        <div className="content">
          {fileTypes.map((type) => (
            <div key={type} className="file-section">
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              {exam[type] ? (
                <div className="ot-tile-item">
                  <div className="ot-tile-clr">
                    <a href={exam[type]} target="_blank" rel="noopener noreferrer">
                      {exam[type].split("/").pop()}
                    </a>
                  </div>
                </div>
              ) : (
                <p>No Files Uploaded</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}