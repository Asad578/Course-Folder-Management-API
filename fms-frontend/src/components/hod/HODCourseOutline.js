import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../instructor/InstCourseOutline.css";
import HODSideBar from "./HODSideBar";

export default function HODCourseOutline() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [courseOutline, setCourseOutline] = useState(null);
  const [loading, setLoading] = useState(true);
  // Fetch course outline based on folderId
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/folders/${folderId}/course-outlines/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setCourseOutline(data[0]); 
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course outlines:", error);
        setLoading(false);
      });
  }, [folderId]);
  if (loading) {
    return <div>Loading course outline...</div>;
  }

  return (
    <>
      <HODSideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1> 
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Course Outline</h2>
        </div>
        <div className="content">
          {courseOutline && courseOutline.media ? (
            <div className="ot-tile-item">
              <div className="ot-tile-clr">
                <a
                  href={`${courseOutline.media}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!courseOutline.media) {
                      e.preventDefault();
                      alert("PDF file not found or URL is invalid.");
                    }
                  }}
                >
                  {courseOutline.media.split("/").pop()} {/* Display file name */}
                </a>
              </div>
            </div>
          ) : (
            <div className="no-outline">
              <p>No Course Outline</p>
              
            </div>
          )}
        </div>
      </div>
    </>
  );
}
