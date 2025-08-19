import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../instructor/InstCourseOutline.css";
import SideBar from "./SideBar";

export default function STGradeSheet() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [gradeSheet, setGradeSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  // Fetch gradesheet based on folderId
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/folders/${folderId}/grade-sheets/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setGradeSheet(data[0]); // Assuming one gradesheet per folder
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching grade sheets:", error);
        setLoading(false);
      });
  }, [folderId]);

  if (loading) {
    return <div>Loading grade sheet...</div>;
  }

  return (
    <>
      <SideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1> {/* Display folder name dynamically */}
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Grade Sheet</h2>
        </div>
        <div className="content">
          {gradeSheet && gradeSheet.media ? (
            <div className="ot-tile-item">
              <div className="ot-tile-clr">
                <a
                  href={`${gradeSheet.media}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!gradeSheet.media) {
                      e.preventDefault();
                      alert("PDF file not found or URL is invalid.");
                    }
                  }}
                >
                  {gradeSheet.media.split("/").pop()} {/* Display file name */}
                </a>
              </div>
            </div>
          ) : (
            <div className="no-grade-sheet">
              <p>No Grade Sheet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}