from rest_framework import generics
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Program, Faculty, CourseCategory, Offering, Course, CourseFaculty, Student, CourseStudent, Quiz, Assignment, Exam, CourseOutline, Attendance, Lab, CourseMaterial, Assessment, Gradesheet
from .serializers import ProgramSerializer, FacultySerializer, CourseCategorySerializer, OfferingSerializer, CourseSerializer, CourseFacultySerializer, StudentSerializer, CourseStudentSerializer, QuizSerializer, AssignmentSerializer, ExamSerializer, CourseOutlineSerializer, AttendanceSerializer, LabSerializer, CourseMaterialSerializer, AssessmentSerializer, GradesheetSerializer

# Program Views
class ProgramListCreateView(generics.ListCreateAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

class ProgramDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

# Faculty Views
class FacultyListCreateView(generics.ListCreateAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer

class FacultyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer

# CourseCategory Views
class CourseCategoryListCreateView(generics.ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer

class CourseCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer

class CoursesByProgramView(generics.ListCreateAPIView):
    serializer_class = CourseCategorySerializer

    def get_queryset(self):
        # Ensure the program exists and fetch courses for it
        program_id = self.kwargs.get('program_id')
        if not Program.objects.filter(id=program_id).exists():
            raise NotFound(detail="Program not found")
        return CourseCategory.objects.filter(program_id=program_id)

    def perform_create(self, serializer):
        # Attach the new course to the program
        program_id = self.kwargs.get('program_id')
        try:
            program = Program.objects.get(id=program_id)
            serializer.save(program=program)
        except Program.DoesNotExist:
            raise NotFound(detail="Program not found")

# Offering Views
class OfferingListCreateView(generics.ListCreateAPIView):
    queryset = Offering.objects.all()
    serializer_class = OfferingSerializer

class OfferingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Offering.objects.all()
    serializer_class = OfferingSerializer

class OfferingsByProgramView(generics.ListCreateAPIView):
    serializer_class = OfferingSerializer

    def get_queryset(self):
        # Ensure the program exists and fetch offerings for it
        program_id = self.kwargs.get('program_id')
        if not Program.objects.filter(id=program_id).exists():
            raise NotFound(detail="Program not found")
        return Offering.objects.filter(program_id=program_id)

    def perform_create(self, serializer):
        # Attach the new offering to the program
        program_id = self.kwargs.get('program_id')
        try:
            program = Program.objects.get(id=program_id)
            serializer.save(program=program)
        except Program.DoesNotExist:
            raise NotFound(detail="Program not found")

# Course Views
class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

# CourseFaculty Views
class CourseFacultyListCreateView(generics.ListCreateAPIView):
    queryset = CourseFaculty.objects.all()
    serializer_class = CourseFacultySerializer

class CourseFacultyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseFaculty.objects.all()
    serializer_class = CourseFacultySerializer

# Student Views
class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

# CourseStudent Views
class CourseStudentListCreateView(generics.ListCreateAPIView):
    queryset = CourseStudent.objects.all()
    serializer_class = CourseStudentSerializer

class CourseStudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseStudent.objects.all()
    serializer_class = CourseStudentSerializer

# Quiz Views
class QuizListCreateView(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

# Assignment Views
class AssignmentListCreateView(generics.ListCreateAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

class AssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

# Exam Views
class ExamListCreateView(generics.ListCreateAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

class ExamDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

# CourseOutline Views
class CourseOutlineListCreateView(generics.ListCreateAPIView):
    queryset = CourseOutline.objects.all()
    serializer_class = CourseOutlineSerializer

class CourseOutlineDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseOutline.objects.all()
    serializer_class = CourseOutlineSerializer

# Attendance Views
class AttendanceListCreateView(generics.ListCreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class AttendanceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

# Lab Views
class LabListCreateView(generics.ListCreateAPIView):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer

class LabDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer

# CourseMaterial Views
class CourseMaterialListCreateView(generics.ListCreateAPIView):
    queryset = CourseMaterial.objects.all()
    serializer_class = CourseMaterialSerializer

class CourseMaterialDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseMaterial.objects.all()
    serializer_class = CourseMaterialSerializer

# Assessment Views
class AssessmentListCreateView(generics.ListCreateAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer

class AssessmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer

# Gradesheet Views
class GradesheetListCreateView(generics.ListCreateAPIView):
    queryset = Gradesheet.objects.all()
    serializer_class = GradesheetSerializer

class GradesheetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Gradesheet.objects.all()
    serializer_class = GradesheetSerializer
