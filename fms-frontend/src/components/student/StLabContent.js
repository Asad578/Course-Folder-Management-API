import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../instructor/InstCourseOutline.css";
import SideBar from "./SideBar";

export default function STLabContent() {
  const { labId, folder_name } = useParams();
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileTypes = ["question", "solution"];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/labs/${labId}/`)
      .then((response) => response.json())
      .then((data) => {
        setLab(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lab:", error);
        setLoading(false);
      });
  }, [labId]);

  if (loading) return <div>Loading lab details...</div>;

  return (
    <>
      <SideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1>
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Lab {lab.name}</h2>
        </div>
        <div className="content">
          {fileTypes.map((type) => (
            <div key={type} className="file-section">
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              {lab[type] ? (
                <div className="ot-tile-item">
                  <div className="ot-tile-clr">
                    <a href={lab[type]} target="_blank" rel="noopener noreferrer">
                      {lab[type].split("/").pop()}
                    </a>
                  </div>
                </div>
              ) : (
                <p>No File Uploaded </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
