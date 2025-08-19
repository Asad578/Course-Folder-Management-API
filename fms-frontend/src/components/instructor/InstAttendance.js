import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import trash icon
import InstructorSideBar from "./InstructorSideBar";
import "./InstCourseOutline.css"; // Ensure styles for modal and buttons

export default function InstAttendance() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal

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

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      setErrorMessage("Only PDF files are allowed.");
      return;
    }

    // Validate file size (less than 20MB)
    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage("File size must be less than 20MB.");
      return;
    }

    setErrorMessage(""); // Clear any previous errors
    setSelectedFile(file);
  };

  // Handle file upload/update
  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a valid PDF file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("media", selectedFile);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/folders/${folderId}/update-attendance/`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update file.");
      }

      const data = await response.json();
      setAttendance(data); // Update UI with the new attendance record
      setShowModal(false); // Close modal
      setSelectedFile(null);
    } catch (error) {
      console.error("Error updating attendance:", error);
      setErrorMessage("Upload failed. Please try again.");
    }
  };

  // Handle file deletion
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/folders/${folderId}/delete-attendance/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete attendance record.");
      }

      setAttendance(null); // Clear the attendance record from the UI
      setShowDeleteModal(false); // Close the delete confirmation modal
    } catch (error) {
      console.error("Error deleting attendance record:", error);
      setErrorMessage("Deletion failed. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading attendance...</div>;
  }

  return (
    <>
      <InstructorSideBar />
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
              <div className="edit-delete-buttons">
                <button className="edit-btn" onClick={() => setShowModal(true)}>
                  <FiEdit className="edit-icon" />
                </button>
                <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>
                  <FiTrash2 className="delete-icon" />
                </button>
              </div>
            </div>
          ) : (
            <div className="no-attendance">
              <p>No Attendance Record</p>
              <button className="upload-btn" onClick={() => setShowModal(true)}>
                Upload Attendance Record
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{attendance && attendance.media ? "Edit Attendance Record" : "Upload Attendance Record"}</h3>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="upload-btn" onClick={handleUpload}>
                {attendance && attendance.media ? "Update" : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this attendance record?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}