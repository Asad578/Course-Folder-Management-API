import CourseDetail from './CourseDetail';
import About from './About';
import { Routes, Route } from 'react-router-dom';
import InstructorDashboard from './instructor/InsturctorDashboard';
import AllCourses from './user/AllCourses';
import StudentDashboard from './student/StudentDashboard';
import NavBar from './NavBar';
import AllFolderTiles from './student/AllFolderTiles';
import HODDashboard from './hod/HODDashboard';
import HODProgram from './hod/HODProgram';
import Assignments from './Assignments';
import AssignmentContent from './AssignemntContent';
import CaseContent from './CaseContent';
import OfferingDetails from './hod/OfferingDetails';
import ProgramDetails from './instructor/ProgramDetails';
import InstructorOffering from './instructor/InstructorOffering';
import FolderDetails from './instructor/FolderDetails';
import InstAssignment from './instructor/InstAssignment';
import InstQuiz from './instructor/InstQuiz';
import InstLab from './instructor/InstLab';
import InstExam from './instructor/InstExam';
import InstAssessment from './instructor/InstAssessment';
import InstCourseOutline from './instructor/InstCourseOutline';
import InstGradeSheet from './instructor/InstGradeSheet';
import InstAttendance from './instructor/InstAttendance';
import InstAssignmentContent from './instructor/InstAssignmentContent';
import InstQuizContent from './instructor/InstQuizContent';
import InstLabContent from './instructor/InstLabContent';
import InstExamContent from './instructor/InstExamContent';
import InstAssessmentContent from './instructor/InstAssessmentContent';
import HODFolderDetails from './hod/HODFolderDetails';
import HODAssignment from './hod/HODAssignment';
import HODAssignmentContent from './hod/HODAssignmentContent';
import HODQuizContent from './hod/HODQuizContent';
import HODLabContent from './hod/HODLabContent';
import HODExamContent from './hod/HODExamContent';
import HODAssessmentContent from './hod/HODAssessmentContent';
import HODQuiz from './hod/HODQuiz';
import HODLab from './hod/HODLab';
import HODExam from './hod/HODExam';
import HODAssessment from './hod/HODAssessment';
import HODCourseOutline from './hod/HODCourseOutline';
import HODGradeSheet from './hod/HODGradeSheet';
import HODAttendance from './hod/HODAttendance';
import STFolderDetails from './student/StFolderDetails';
import StAssignment from './student/StAssignment';
import StAssignmentContent from './student/StAssignmentContent';
import STQuizContent from './student/StQuizContent';
import STLabContent from './student/StLabContent';
import STExamContent from './student/StExamContent';
import StAssessmentContent from './student/StAssessmentContent';
import STQuiz from './student/StQuiz';
import STLab from './student/StLab';
import StExam from './student/StExam';
import StAssessment from './student/StAssessment';
import StCourseOutline from './student/StCourseOutline';
import STGradeSheet from './student/StGradeSheet';
import StAttendance from './student/StAttendance';
import InstMyCourses from './instructor/InstMyCourses';

function Main() {
  return (
    <div className="App">
      <NavBar/>
        <Routes>
            <Route path='/' element={<HODDashboard/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/course/:course_id' element={<CourseDetail/>}></Route>
            <Route path='/my-courses' element={<AllCourses/>}></Route>
            <Route path='/instructor-programs' element={<InstructorDashboard/>}></Route>
            <Route path='/instructor-programs/:programId' element={<ProgramDetails/>}></Route>
            <Route path='/instructor-programs/offering-details/:offeringId/:session' element={<InstructorOffering/>}></Route>
            <Route path='/instructor-programs/folders/:folderId/:folder_name' element={<FolderDetails/>}></Route>

            <Route path='/instructor-programs/assignments/:folderId/:folder_name' element={<InstAssignment/>}></Route>
            <Route path='/instructor-programs/assignments/assignmentcontent/:assignmentId/:folder_name' element={<InstAssignmentContent/>}></Route>
            <Route path='/instructor-programs/quizzes/quizcontent/:quizId/:folder_name' element={<InstQuizContent/>}></Route>
            <Route path='/instructor-programs/labs/labcontent/:labId/:folder_name' element={<InstLabContent/>}></Route>
            <Route path='/instructor-programs/exams/examcontent/:examId/:folder_name' element={<InstExamContent/>}></Route>
            <Route path='/instructor-programs/assessments/assessmentcontent/:assessmentId/:folder_name' element={<InstAssessmentContent/>}></Route>
            <Route path='/instructor-programs/quizzes/:folderId/:folder_name' element={<InstQuiz/>}></Route>
            <Route path='/instructor-programs/labs/:folderId/:folder_name' element={<InstLab/>}></Route>
            <Route path='/instructor-programs/exams/:folderId/:folder_name' element={<InstExam/>}></Route>
            <Route path='/instructor-programs/assessments/:folderId/:folder_name' element={<InstAssessment/>}></Route>
            <Route path='/instructor-programs/outline/:folderId/:folder_name' element={<InstCourseOutline/>}></Route>
            <Route path='/instructor-programs/grades/:folderId/:folder_name' element={<InstGradeSheet/>}></Route>
            <Route path='/instructor-programs/attendance/:folderId/:folder_name' element={<InstAttendance/>}></Route>
            <Route path="/instructor-dashboard" element={<InstMyCourses />} />


            <Route path="/offering-details/:offeringId/:session" element={<OfferingDetails />} />
            <Route path='/allfoldertiles' element={<AllFolderTiles/>}></Route>

            <Route path='/hod-dashboard' element={<HODDashboard/>}></Route>
            <Route path='/hod-programs/folders/:folderId/:folder_name' element={<HODFolderDetails/>}></Route>
            <Route path='/hod-programs/assignments/:folderId/:folder_name' element={<HODAssignment/>}></Route>
            <Route path='/hod-programs/assignments/assignmentcontent/:assignmentId/:folder_name' element={<HODAssignmentContent/>}></Route>
            <Route path='/hod-programs/quizzes/quizcontent/:quizId/:folder_name' element={<HODQuizContent/>}></Route>
            <Route path='/hod-programs/labs/labcontent/:labId/:folder_name' element={<HODLabContent/>}></Route>
            <Route path='/hod-programs/exams/examcontent/:examId/:folder_name' element={<HODExamContent/>}></Route>
            <Route path='/hod-programs/assessments/assessmentcontent/:assessmentId/:folder_name' element={<HODAssessmentContent/>}></Route>
            <Route path='/hod-programs/quizzes/:folderId/:folder_name' element={<HODQuiz/>}></Route>
            <Route path='/hod-programs/labs/:folderId/:folder_name' element={<HODLab/>}></Route>
            <Route path='/hod-programs/exams/:folderId/:folder_name' element={<HODExam/>}></Route>
            <Route path='/hod-programs/assessments/:folderId/:folder_name' element={<HODAssessment/>}></Route>
            <Route path='/hod-programs/outline/:folderId/:folder_name' element={<HODCourseOutline/>}></Route>
            <Route path='/hod-programs/grades/:folderId/:folder_name' element={<HODGradeSheet/>}></Route>
            <Route path='/hod-programs/attendance/:folderId/:folder_name' element={<HODAttendance/>}></Route>

            <Route path='/assignments' element={<Assignments/>}></Route>
            <Route path='/assignmentcontent' element={<AssignmentContent/>}></Route>
            <Route path='/casecontent' element={<CaseContent/>}></Route>
            <Route path='/program/:programId' element={<HODProgram></HODProgram>} />

            <Route path='/student-dashboard' element={<StudentDashboard/>}></Route>
            <Route path='/student-courses/folders/:folderId/:folder_name' element={<STFolderDetails/>}></Route>
            <Route path='/student-courses/assignments/:folderId/:folder_name' element={<StAssignment/>}></Route>
            <Route path='/student-courses/assignments/assignmentcontent/:assignmentId/:folder_name' element={<StAssignmentContent/>}></Route>
            <Route path='/student-courses/quizzes/quizcontent/:quizId/:folder_name' element={<STQuizContent/>}></Route>
            <Route path='/student-courses/labs/labcontent/:labId/:folder_name' element={<STLabContent/>}></Route>
            <Route path='/student-courses/exams/examcontent/:examId/:folder_name' element={<STExamContent/>}></Route>
            <Route path='/student-courses/assessments/assessmentcontent/:assessmentId/:folder_name' element={<StAssessmentContent/>}></Route>
            <Route path='/student-courses/quizzes/:folderId/:folder_name' element={<STQuiz/>}></Route>
            <Route path='/student-courses/labs/:folderId/:folder_name' element={<STLab/>}></Route>
            <Route path='/student-courses/exams/:folderId/:folder_name' element={<StExam/>}></Route>
            <Route path='/student-courses/assessments/:folderId/:folder_name' element={<StAssessment/>}></Route>
            <Route path='/student-courses/outline/:folderId/:folder_name' element={<StCourseOutline/>}></Route>
            <Route path='/student-courses/grades/:folderId/:folder_name' element={<STGradeSheet/>}></Route>
            <Route path='/student-courses/attendance/:folderId/:folder_name' element={<StAttendance/>}></Route>



        </Routes>
      
    </div>
  );
}

export default Main;
