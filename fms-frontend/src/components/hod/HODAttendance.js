import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../instructor/InstCourseOutline.css";
import HODSideBar from "./HODSideBar";

export default function HODAttendance() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  // Fetch attendance based on folderId
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/folders/${folderId}/attendance/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setAttendance(data[0]); // Assuming one attendance record per folder
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching attendance records:", error);
        setLoading(false);
      });
  }, [folderId]);

  if (loading) {
    return <div>Loading attendance...</div>;
  }

  return (
    <>
      <HODSideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1> {/* Display folder name dynamically */}
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Attendance</h2>
        </div>
        <div className="content">
          {attendance && attendance.media ? (
            <div className="ot-tile-item">
              <div className="ot-tile-clr">
                <a
                  href={`${attendance.media}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!attendance.media) {
                      e.preventDefault();
                      alert("PDF file not found or URL is invalid.");
                    }
                  }}
                >
                  {attendance.media.split("/").pop()} {/* Display file name */}
                </a>
              </div>
            </div>
          ) : (
            <div className="no-attendance">
              <p>No Attendance Record</p>
              
            </div>
          )}
        </div>
      </div>
    </>
  );
}