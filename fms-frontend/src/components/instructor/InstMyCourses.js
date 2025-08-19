import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./OfferingDetails.css";
import InstructorSideBar from "./InstructorSideBar";
import { MdClose, MdCheck, MdNavigateNext, MdExpandMore, MdExpandLess } from "react-icons/md";

function InstMyCourses() {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState({});
  const [assignments, setAssignments] = useState({});
  const [assessments, setAssessments] = useState({});
  const [exams, setExams] = useState({});
  const [labs, setLabs] = useState({});
  const [outlines, setOutlines] = useState({});
  const [attendances, setAttendances] = useState({});
  const [gradesheets, setGradesheets] = useState({});

  const [showOutlines, setShowOutlines] = useState(true);
  const [showQuizzes, setShowQuizzes] = useState(true);
  const [showAssignments, setShowAssignments] = useState(true);
  const [showAssessments, setShowAssessments] = useState(true);
  const [showExams, setShowExams] = useState(true); 
  const [showLabs, setShowLabs] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const instructorId = 2;
    fetch(`http://127.0.0.1:8000/api/courses/instructor/${instructorId}/`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        data.forEach((course) => {
          fetch(`http://127.0.0.1:8000/api/folders/${course.id}/quizzes/`)
            .then((response) => response.json())
            .then((quizzesData) => {
              setQuizzes((prevQuizzes) => ({
                ...prevQuizzes,
                [course.id]: quizzesData,
              }));
            });
          fetch(`http://127.0.0.1:8000/api/folders/${course.id}/assignments/`)
            .then((response) => response.json())
            .then((assignmentsData) => {
              setAssignments((prevAssignments) => ({
                ...prevAssignments,
                [course.id]: assignmentsData,
              }));
            });
            fetch(`http://127.0.0.1:8000/api/folders/${course.id}/assessments/`)
            .then((response) => response.json())
            .then((assessmentsData) => {
              setAssessments((prevAssessments) => ({
                ...prevAssessments,
                [course.id]: assessmentsData,
              }));
            });
            fetch(`http://127.0.0.1:8000/api/folders/${course.id}/exams/`)
            .then((response) => response.json())
            .then((examsData) => {
              setExams((prevExams) => ({
                ...prevExams,
                [course.id]: examsData,
              }));
            });
            fetch(`http://127.0.0.1:8000/api/folders/${course.id}/labs/`)
            .then((response) => response.json())
            .then((labsData) => {
              setLabs((prevLabs) => ({
                ...prevLabs,
                [course.id]: labsData,
              }));
            });
            fetch(`http://127.0.0.1:8000/api/folders/${course.id}/course-outlines/`)
            .then((response) => response.json())
            .then((outlineData) => {
              setOutlines((prevOutlines) => ({
                ...prevOutlines,
                [course.id]: outlineData.length > 0 && outlineData[0].media ? true : false,
              }));
            });
            fetch(`http://127.0.0.1:8000/api/folders/${course.id}/attendance/`)
            .then((response) => response.json())
            .then((attendanceData) => {
              setAttendances((prevAttendances) => ({
                ...prevAttendances,
                [course.id]: attendanceData.length > 0 && attendanceData[0].media ? true : false,
              }));
            });
            fetch(`http://127.0.0.1:8000/api/folders/${course.id}/grade-sheets/`)
            .then((response) => response.json())
            .then((gradesheetData) => {
              setGradesheets((prevGradesheets) => ({
                ...prevGradesheets,
                [course.id]: gradesheetData.length > 0 && gradesheetData[0].media ? true : false,
              }));
            });
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  
  const areAllFilesUploaded = (item) => item.question && item.solution && item.best && item.average && item.worst;
  const areAllLabsFilesUploaded = (lab) => lab.question && lab.solution;


  if (loading) return <div>Loading...</div>;

  return (
    <>
      <InstructorSideBar />
      <div className="dashboard">
        <div className="main-heading">
          <h1>My Courses</h1>
        </div>
        <hr className="separator" />
        <div className="content">
          <div className="off-tile-list">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course.id} className="off-tile-item">
                  <div className="off-tile-clr">
                    <Link to={`/instructor-programs/folders/${course.id}/${course.folder_name}`}>
                      <h4>{course.folder_name}</h4>
                      <p>{course.credits} Credits | {course.course_offering.session}</p>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No courses assigned to you.</p>
            )}
          </div>
        </div>
        <hr className="separator" />
        <div className="dropdown-item">
          <div className="dd-heading" onClick={() => setShowOutlines(!showOutlines)} style={{ cursor: "pointer" }}>
            <h2>Missing Outline, Attendance, Gradesheet</h2>
            <h2>{showOutlines ? <MdExpandLess /> : <MdExpandMore />}</h2>
          </div>
        </div>
        
        {showOutlines && (
          <div className="content"> <div className="incompletes-table-container">
            <table className="table-content">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Module</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {courses.filter((course) => !outlines[course.id])
                    .map((course) => (
                      <tr key={course.id}>
                        <td>{course.folder_name}</td>
                        <td>Outline</td>
                        <td>
                          <MdClose style={{ color: "red" }} /> 
                        </td>
                        <td>
                          <Link to={`/instructor-programs/outline/${course.id}/${course.folder_name}`}>
                            <MdNavigateNext style={{ color: "blue", cursor: "pointer", width: "100%" }} />
                          </Link>
                        </td>
                      </tr>
                    ))}
              {courses.filter((course) => !attendances[course.id])
                    .map((course) => (
                      <tr key={course.id}>
                        <td>{course.folder_name}</td>
                        <td>Attendance</td>
                        <td>
                          <MdClose style={{ color: "red" }} /> 
                        </td>
                        <td>
                          <Link to={`/instructor-programs/attendance/${course.id}/${course.folder_name}`}>
                            <MdNavigateNext style={{ color: "blue", cursor: "pointer", width: "100%" }} />
                          </Link>
                        </td>
                      </tr>
                    ))}
              {courses.filter((course) => !gradesheets[course.id])
                    .map((course) => (
                      <tr key={course.id}>
                        <td>{course.folder_name}</td>
                        <td>Gradesheet</td>
                        <td>
                          <MdClose style={{ color: "red" }} /> 
                        </td>
                        <td>
                          <Link to={`/instructor-programs/grades/${course.id}/${course.folder_name}`}>
                            <MdNavigateNext style={{ color: "blue", cursor: "pointer", width: "100%" }} />
                          </Link>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table></div>
          </div>
        )}
        
        <hr className="separator" />
        <div className="dropdown-item">
          <div className="dd-heading" onClick={() => setShowQuizzes(!showQuizzes)} style={{ cursor: "pointer" }}>
            <h2>Missing Quiz Contents </h2>
            <h2>{showQuizzes ? <MdExpandLess /> : <MdExpandMore />}</h2>
          </div>
        </div>
        
        {showQuizzes && (
          <div className="content"> <div className="incompletes-table-container">
            <table className="table-content">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Quiz No</th>
                  <th>Question</th>
                  <th>Solution</th>
                  <th>Best</th>
                  <th>Average</th>
                  <th>Worst</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) =>
                  quizzes[course.id]?.filter((quiz) => !areAllFilesUploaded(quiz)).map((quiz) => (
                    <tr key={quiz.quiz_id}>
                      <td>{course.folder_name}</td>
                      <td>{quiz.quiz_no}</td>
                      <td>{quiz.question ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{quiz.solution ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{quiz.best ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{quiz.average ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{quiz.worst ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>
                        <Link to={`/instructor-programs/quizzes/quizcontent/${quiz.quiz_id}/${course.folder_name}`}>
                          <MdNavigateNext style={{ color: "blue", cursor: "pointer", width: "100%" }} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table></div>
          </div>
        )}
        <hr className="separator" />
        <div className="dropdown-item">
          <div className="dd-heading" onClick={() => setShowAssignments(!showAssignments)} style={{ cursor: "pointer" }}>
            <h2>Missing Assignment Contents </h2>
            <h2>{showAssignments ? <MdExpandLess /> : <MdExpandMore />}</h2>
          </div>
        </div>
        {showAssignments && (
          <div className="content"> <div className="incompletes-table-container">
            <table className="table-content">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Assignment No</th>
                  <th>Question</th>
                  <th>Solution</th>
                  <th>Best</th>
                  <th>Average</th>
                  <th>Worst</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) =>
                  assignments[course.id]?.filter((assignment) => !areAllFilesUploaded(assignment)).map((assignment) => (
                    <tr key={assignment.assignment_id}>
                      <td>{course.folder_name}</td>
                      <td>{assignment.assignment_no}</td>
                      <td>{assignment.question ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{assignment.solution ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{assignment.best ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{assignment.average ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{assignment.worst ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>
                        <Link to={`/instructor-programs/assignments/assignmentcontent/${assignment.assignment_id}/${course.folder_name}`}>
                          <MdNavigateNext style={{ color: "blue", cursor: "pointer", width: "100%" }} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table></div>
          </div>
        )}
        <hr className="separator" />
        <div className="dropdown-item">
          <div className="dd-heading" onClick={() => setShowAssessments(!showAssessments)} style={{ cursor: "pointer" }}>
            <h2>Missing Assessment Contents </h2>
            <h2>{showAssessments ? <MdExpandLess /> : <MdExpandMore />}</h2>
          </div>
        </div>
        {showAssessments && (
          <div className="content"> <div className="incompletes-table-container">
            <table className="table-content">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Assessment No</th>
                  <th>Question</th>
                  <th>Solution</th>
                  <th>Best</th>
                  <th>Average</th>
                  <th>Worst</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) =>
                  assessments[course.id]?.filter((assessment) => !areAllFilesUploaded(assessment)).map((assessment) => (
                    <tr key={assessment.id}>
                      <td>{course.folder_name}</td>
                      <td>{assessment.assessment_name}</td>
                      <td>{assessment.question ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{assessment.solution ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{assessment.best ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{assessment.average ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{assessment.worst ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>
                        <Link to={`/instructor-programs/assessments/assessmentcontent/${assessment.id}/${course.folder_name}`}>
                          <MdNavigateNext style={{ color: "blue", cursor: "pointer", width: "100%" }} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table></div>
          </div>
        )}
        <hr className="separator" />
        <div className="dropdown-item">
          <div className="dd-heading" onClick={() => setShowExams(!showExams)} style={{ cursor: "pointer" }}>
            <h2>Missing Exam Contents </h2>
            <h2>{showExams ? <MdExpandLess /> : <MdExpandMore />}</h2>
          </div>
        </div>
        
        {showExams && (
          <div className="content"> <div className="incompletes-table-container">
            <table className="table-content">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Exams</th>
                  <th>Question</th>
                  <th>Solution</th>
                  <th>Best</th>
                  <th>Average</th>
                  <th>Worst</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) =>
                  exams[course.id]?.filter((exam) => !areAllFilesUploaded(exam)).map((exam) => (
                    <tr key={exam.exam_id}>
                      <td>{course.folder_name}</td>
                      <td>{exam.exam_name}</td>
                      <td>{exam.question ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{exam.solution ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{exam.best ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{exam.average ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{exam.worst ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>
                        <Link to={`/instructor-programs/exams/examcontent/${exam.exam_id}/${course.folder_name}`}>
                          <MdNavigateNext style={{ color: "blue", cursor: "pointer", width: "100%" }} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table></div>
          </div>
        )}
        
        <hr className="separator" />
        <div className="dropdown-item">
          <div className="dd-heading" onClick={() => setShowLabs(!showLabs)} style={{ cursor: "pointer" }}>
            <h2>Missing Lab Contents </h2>
            <h2>{showLabs ? <MdExpandLess /> : <MdExpandMore />}</h2>
          </div>
        </div>
        
        {showLabs && (
          <div className="content"> <div className="incompletes-table-container">
            <table className="table-content">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Labs</th>
                  <th>Question</th>
                  <th>Solution</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) =>
                  labs[course.id]?.filter((lab) => !areAllLabsFilesUploaded(lab)).map((lab) => (
                    <tr key={lab.id}>
                      <td>{course.folder_name}</td>
                      <td>{lab.name}</td>
                      <td>{lab.question ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>{lab.solution ? <MdCheck style={{ color: "green" }} /> : <MdClose style={{ color: "red" }} />}</td>
                      <td>
                        <Link to={`/instructor-programs/labs/labcontent/${lab.id}/${course.folder_name}`}>
                          <MdNavigateNext style={{ color: "blue", cursor: "pointer", width: "100%" }} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table></div>
          </div>
        )}
        
      </div>
    </>
  );
}

export default InstMyCourses;
