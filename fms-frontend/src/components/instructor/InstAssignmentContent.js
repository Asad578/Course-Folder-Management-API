import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import InstructorSideBar from "./InstructorSideBar";
import "./InstCourseOutline.css"; // Ensure styles for modal and buttons

export default function InstAssignmentContent() {
  const { assignmentId, folder_name } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileField, setFileField] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFileField, setDeleteFileField] = useState("");

  const fileTypes = ["question", "solution", "best", "average", "worst"];

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

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
        setErrorMessage("Only PDF files are allowed.");
        return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage("File size must be less than 20MB.");
      return;
    }

    setErrorMessage("");
    setSelectedFile(file);
  };

  // Handle file upload/update
  const handleUpload = async () => {
    if (!selectedFile || !fileField) {
      setErrorMessage("Please select a valid file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("file_field", fileField);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/assignments/${assignmentId}/upload/`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update file.");

      const data = await response.json();
      setAssignment(data);
      setShowModal(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error updating file:", error);
      setErrorMessage("Upload failed. Please try again.");
    }
  };


  // Open delete confirmation modal
  const confirmDelete = (fileType) => {
    setDeleteFileField(fileType);
    setShowDeleteModal(true);
  };

  // Handle file deletion
  const handleDelete = async () => {
    if (!deleteFileField) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/assignments/${assignmentId}/delete/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_field: deleteFileField }),
      });

      if (!response.ok) throw new Error("Failed to delete file.");

      const data = await response.json();
      setAssignment(data);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("File deletion failed.");
    }
  };


  if (loading) return <div>Loading assignment details...</div>;

  return (
    <>
      <InstructorSideBar />
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
                  <div className="edit-delete-btn">
                  <button className="delete-btn" onClick={() => confirmDelete(type)}>
                    <FiTrash2 className="delete-icon" />
                  </button>
                  <button className="edit-btn" onClick={() => {
                    setFileField(type);
                    setShowModal(true);
                  }}>
                    <FiEdit className="edit-icon" />
                  </button>
                  </div>
                </div>
              ) : (
                <button className="upload-btn" onClick={() => {
                  setFileField(type);
                  setShowModal(true);
                }}>
                  Upload {type}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Upload {fileField}</h3>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="upload-btn" onClick={handleUpload}>Upload</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this file?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
