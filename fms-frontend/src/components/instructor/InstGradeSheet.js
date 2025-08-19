import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import trash icon
import InstructorSideBar from "./InstructorSideBar";
import "./InstCourseOutline.css"; // Ensure styles for modal and buttons

export default function InstGradeSheet() {
  const { folderId, folder_name } = useParams(); // Get folder ID and name from URL
  const [gradeSheet, setGradeSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal

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
      const response = await fetch(`http://127.0.0.1:8000/api/folders/${folderId}/update-grade-sheet/`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update file.");
      }

      const data = await response.json();
      setGradeSheet(data); // Update UI with the new gradesheet
      setShowModal(false); // Close modal
      setSelectedFile(null);
    } catch (error) {
      console.error("Error updating grade sheet:", error);
      setErrorMessage("Upload failed. Please try again.");
    }
  };

  // Handle file deletion
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/folders/${folderId}/delete-grade-sheet/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete grade sheet.");
      }

      setGradeSheet(null); // Clear the grade sheet from the UI
      setShowDeleteModal(false); // Close the delete confirmation modal
    } catch (error) {
      console.error("Error deleting grade sheet:", error);
      setErrorMessage("Deletion failed. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading grade sheet...</div>;
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
              <div className="edit-delete-buttons">
              <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>
                  <FiTrash2 className="delete-icon" />
                </button>
                <button className="edit-btn" onClick={() => setShowModal(true)}>
                  <FiEdit className="edit-icon" />
                </button>
                
              </div>
            </div>
          ) : (
            <div className="no-grade-sheet">
              <p>No Grade Sheet</p>
              <button className="upload-btn" onClick={() => setShowModal(true)}>
                Upload Grade Sheet
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{gradeSheet && gradeSheet.media ? "Edit Grade Sheet" : "Upload Grade Sheet"}</h3>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="upload-btn" onClick={handleUpload}>
                {gradeSheet && gradeSheet.media ? "Update" : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this grade sheet?</h3>
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