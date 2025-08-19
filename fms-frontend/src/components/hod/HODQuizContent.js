import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../instructor/InstCourseOutline.css";
import HODSideBar from "./HODSideBar";

export default function HODQuizContent() {
  const { quizId, folder_name } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileTypes = ["question", "solution", "best", "average", "worst"];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/quizzes/${quizId}/`)
      .then((response) => response.json())
      .then((data) => {
        setQuiz(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      });
  }, [quizId]);

  if (loading) return <div>Loading quiz details...</div>;

  return (
    <>
      <HODSideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>{folder_name}</h1>
        </div>
        <hr className="separator" />
        <div className="heading">
          <h2>Quiz {quiz.quiz_no}</h2>
        </div>
        <div className="content">
          {fileTypes.map((type) => (
            <div key={type} className="file-section">
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              {quiz[type] ? (
                <div className="ot-tile-item">
                  <div className="ot-tile-clr">
                    <a href={quiz[type]} target="_blank" rel="noopener noreferrer">
                      {quiz[type].split("/").pop()}
                    </a>
                  </div>
                </div>
              ) : (
                <p>No File Uploaded</p>
              )}
            </div>
          ))}
        </div>
      </div>    </>
  );
}
