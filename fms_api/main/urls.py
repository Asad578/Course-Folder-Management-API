from django.urls import path
from .views import (
    ProgramListCreateView, ProgramDetailView, FacultyListCreateView, FacultyDetailView,
    CourseCategoryListCreateView, CourseCategoryDetailView, OfferingListCreateView, OfferingDetailView, OfferingsByProgramView,
    CourseListCreateView, CourseDetailView, CourseFacultyListCreateView, CourseFacultyDetailView, CoursesByProgramView,
    StudentListCreateView, StudentDetailView, CourseStudentListCreateView, CourseStudentDetailView,
    QuizListCreateView, QuizDetailView, AssignmentListCreateView, AssignmentDetailView,
    ExamListCreateView, ExamDetailView, CourseOutlineListCreateView, CourseOutlineDetailView,
    AttendanceListCreateView, AttendanceDetailView, LabListCreateView, LabDetailView,
    CourseMaterialListCreateView, CourseMaterialDetailView, AssessmentListCreateView, AssessmentDetailView,
    GradesheetListCreateView, GradesheetDetailView
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

    # Course URLs
    path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),

    # Course Faculty URLs
    path('course-faculties/', CourseFacultyListCreateView.as_view(), name='course-faculty-list-create'),
    path('course-faculties/<int:pk>/', CourseFacultyDetailView.as_view(), name='course-faculty-detail'),

    # Student URLs
    path('students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('students/<int:pk>/', StudentDetailView.as_view(), name='student-detail'),

    # Course Student URLs
    path('course-students/', CourseStudentListCreateView.as_view(), name='course-student-list-create'),
    path('course-students/<int:pk>/', CourseStudentDetailView.as_view(), name='course-student-detail'),

    # Quiz URLs
    path('quizzes/', QuizListCreateView.as_view(), name='quiz-list-create'),
    path('quizzes/<int:pk>/', QuizDetailView.as_view(), name='quiz-detail'),

    # Assignment URLs
    path('assignments/', AssignmentListCreateView.as_view(), name='assignment-list-create'),
    path('assignments/<int:pk>/', AssignmentDetailView.as_view(), name='assignment-detail'),

    # Exam URLs
    path('exams/', ExamListCreateView.as_view(), name='exam-list-create'),
    path('exams/<int:pk>/', ExamDetailView.as_view(), name='exam-detail'),

    # Course Outline URLs
    path('course-outlines/', CourseOutlineListCreateView.as_view(), name='course-outline-list-create'),
    path('course-outlines/<int:pk>/', CourseOutlineDetailView.as_view(), name='course-outline-detail'),

    # Attendance URLs
    path('attendances/', AttendanceListCreateView.as_view(), name='attendance-list-create'),
    path('attendances/<int:pk>/', AttendanceDetailView.as_view(), name='attendance-detail'),

    # Lab URLs
    path('labs/', LabListCreateView.as_view(), name='lab-list-create'),
    path('labs/<int:pk>/', LabDetailView.as_view(), name='lab-detail'),

    # Course Material URLs
    path('course-materials/', CourseMaterialListCreateView.as_view(), name='course-material-list-create'),
    path('course-materials/<int:pk>/', CourseMaterialDetailView.as_view(), name='course-material-detail'),

    # Assessment URLs
    path('assessments/', AssessmentListCreateView.as_view(), name='assessment-list-create'),
    path('assessments/<int:pk>/', AssessmentDetailView.as_view(), name='assessment-detail'),

    # Gradesheet URLs
    path('gradesheets/', GradesheetListCreateView.as_view(), name='gradesheet-list-create'),
    path('gradesheets/<int:pk>/', GradesheetDetailView.as_view(), name='gradesheet-detail'),
]
