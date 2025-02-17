from django.urls import path
from .views import (
    ProgramListCreateView, ProgramDetailView, FacultyListCreateView, FacultyDetailView,
    CourseCategoryListCreateView, CourseCategoryDetailView, OfferingListCreateView, OfferingDetailView, OfferingsByProgramView,
    CourseListCreateView, CourseDetailView, CourseFoldersListCreateView, CourseFoldersDetailView, CoursesByProgramView,QuizFileUploadView, QuizFileDeleteView,
    StudentListCreateView, StudentDetailView, CourseFoldersByOfferingView, CurrentOfferingsListView, ExamsByFolderView, LabFileUploadView, LabFileDeleteView,
    QuizListCreateView, QuizDetailView, AssignmentListCreateView, AssignmentDetailView, AssignmentsByFolderView, AssessmentsByFolderView, AssignmentFileUploadView, AssignmentFileDeleteView,
    ExamListCreateView, ExamDetailView, CourseOutlineListCreateView, CourseOutlineDetailView, LabsByFolderView, CourseOutlineByFolderView,
    AttendanceListCreateView, AttendanceDeleteView, AttendanceDetailView, LabListCreateView, LabDetailView, QuizzesByFolderView, CourseOutlineUploadView, ExamFileUploadView,ExamFileDeleteView, 
    CourseMaterialListCreateView, StudentEnrolledCoursesView, CourseMaterialDetailView, AssessmentListCreateView, AssessmentFileUploadView, AssessmentFileDeleteView, AssessmentDetailView, AttendanceByFolderView, AttendanceUploadView, 
    GradesheetListCreateView, GradesheetDetailView, GradesheetByFolderView, GradesheetUploadView,GradesheetDeleteView, CourseOutlineDeleteView
)

urlpatterns = [
    # Program URLs
    path('program/', ProgramListCreateView.as_view(), name='program-list-create'),
    path('program/<int:pk>/', ProgramDetailView.as_view(), name='program-detail'),

    # Faculty URLs
    path('faculties/', FacultyListCreateView.as_view(), name='faculty-list-create'),
    path('faculties/<int:pk>/', FacultyDetailView.as_view(), name='faculty-detail'),

    # Course Category URLs
    path('course-categories/', CourseCategoryListCreateView.as_view(), name='course-category-list-create'),
    path('course-categories/<int:pk>/', CourseCategoryDetailView.as_view(), name='course-category-detail'),
    path('program/<int:program_id>/course-categories/', CoursesByProgramView.as_view(), name='program-courses'),


    # Offering URLs
    path('offerings/', OfferingListCreateView.as_view(), name='offering-list-create'),
    path('offerings/<int:pk>/', OfferingDetailView.as_view(), name='offering-detail'),
    path('program/<int:program_id>/offerings/', OfferingsByProgramView.as_view(), name='program-offerings'),

    # Offering Course URLs
    path('offeringcourses/', CourseListCreateView.as_view(), name='off-courses-list-create'),
    path('offeringcourses/<int:pk>/', CourseDetailView.as_view(), name='off-courses-detail'),
    path('current-offerings/', CurrentOfferingsListView.as_view(), name='current-offerings'),


    # Course Folders URLs
    path('courses/', CourseFoldersListCreateView.as_view(), name='course-folder-list-create'),
    path('courses/<int:pk>/', CourseFoldersDetailView.as_view(), name='course-folder-detail'),
    path('offerings/<int:offering_id>/course-folders/', CourseFoldersByOfferingView.as_view(), name='offering-course-folders'),
    path('students/<int:student_id>/enrolled-courses/', StudentEnrolledCoursesView.as_view(), name='student-enrolled-courses'),


    # Student URLs
    path('students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('students/<int:pk>/', StudentDetailView.as_view(), name='student-detail'),

    # Quiz URLs
    path('quizzes/', QuizListCreateView.as_view(), name='quiz-list-create'),
    path('quizzes/<int:pk>/', QuizDetailView.as_view(), name='quiz-detail'),
    path('folders/<int:folder_id>/quizzes/', QuizzesByFolderView.as_view(), name='quizzes-by-folder'),
    path('quizzes/<int:quiz_id>/upload/', QuizFileUploadView.as_view(), name='quiz_upload'),
    path('quizzes/<int:quiz_id>/delete/', QuizFileDeleteView.as_view(), name='quiz_delete'),

    # Assignment URLs
    path('assignments/', AssignmentListCreateView.as_view(), name='assignment-list-create'),
    path('assignments/<int:pk>/', AssignmentDetailView.as_view(), name='assignment-detail'),
    path('folders/<int:folder_id>/assignments/', AssignmentsByFolderView.as_view(), name='assignments-by-folder'),
    path('assignments/<int:assignment_id>/upload/', AssignmentFileUploadView.as_view(), name='assignment-upload'),
    path('assignments/<int:assignment_id>/delete/', AssignmentFileDeleteView.as_view(), name='assignment-delete'),


    # Exam URLs
    path('exams/', ExamListCreateView.as_view(), name='exam-list-create'),
    path('exams/<int:pk>/', ExamDetailView.as_view(), name='exam-detail'),
    path('folders/<int:folder_id>/exams/', ExamsByFolderView.as_view(), name='exams-by-folder'),
    path('exams/<int:exam_id>/upload/', ExamFileUploadView.as_view(), name='exam-upload'),
    path('exams/<int:exam_id>/delete/', ExamFileDeleteView.as_view(), name='exam-delete'),

    # Course Outline URLs
    path('course-outlines/', CourseOutlineListCreateView.as_view(), name='course-outline-list-create'),
    path('course-outlines/<int:pk>/', CourseOutlineDetailView.as_view(), name='course-outline-detail'),
    path('folders/<int:folder_id>/course-outlines/', CourseOutlineByFolderView.as_view(), name='course-outline-by-folder'),
    path('folders/<int:folder_id>/update-course-outline/', CourseOutlineUploadView.as_view(), name='update-course-outline'),
    path('folders/<int:folder_id>/delete-course-outline/', CourseOutlineDeleteView.as_view(), name='delete-course-outline'),

    # Attendance URLs
    path('attendances/', AttendanceListCreateView.as_view(), name='attendance-list-create'),
    path('attendances/<int:pk>/', AttendanceDetailView.as_view(), name='attendance-detail'),
    path('folders/<int:folder_id>/attendance/', AttendanceByFolderView.as_view(), name='attendance-by-folder'),
    path('folders/<int:folder_id>/update-attendance/', AttendanceUploadView.as_view(), name='update-attendance'),
    path('folders/<int:folder_id>/delete-attendance/', AttendanceDeleteView.as_view(), name='delete-attendance'),

    # Lab URLs
    path('labs/', LabListCreateView.as_view(), name='lab-list-create'),
    path('labs/<int:pk>/', LabDetailView.as_view(), name='lab-detail'),
    path('folders/<int:folder_id>/labs/', LabsByFolderView.as_view(), name='labs-by-folder'),
    path('labs/<int:id>/upload/', LabFileUploadView.as_view(), name='lab-file-upload'),
    path('labs/<int:id>/delete/', LabFileDeleteView.as_view(), name='lab-file-delete'),

    # Course Material URLs
    path('course-materials/', CourseMaterialListCreateView.as_view(), name='course-material-list-create'),
    path('course-materials/<int:pk>/', CourseMaterialDetailView.as_view(), name='course-material-detail'),

    # Assessment URLs
    path('assessments/', AssessmentListCreateView.as_view(), name='assessment-list-create'),
    path('assessments/<int:pk>/', AssessmentDetailView.as_view(), name='assessment-detail'),
    path('folders/<int:folder_id>/assessments/', AssessmentsByFolderView.as_view(), name='assessments-by-folder'),
    path('assessments/<int:assessment_id>/upload/', AssessmentFileUploadView.as_view(), name='assessment-upload'),
    path('assessments/<int:assessment_id>/delete/', AssessmentFileDeleteView.as_view(), name='assessment-delete'),

    # Gradesheet URLs
    path('gradesheets/', GradesheetListCreateView.as_view(), name='gradesheet-list-create'),
    path('gradesheets/<int:pk>/', GradesheetDetailView.as_view(), name='gradesheet-detail'),
    path('folders/<int:folder_id>/grade-sheets/', GradesheetByFolderView.as_view(), name='grade-sheet-by-folder'),
    path('folders/<int:folder_id>/update-grade-sheet/', GradesheetUploadView.as_view(), name='update-grade-sheet'),
    path('folders/<int:folder_id>/delete-grade-sheet/', GradesheetDeleteView.as_view(), name='delete-grade-sheet'),

]
