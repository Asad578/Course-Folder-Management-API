from rest_framework import generics
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from datetime import date
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from .models import Program, Faculty, CourseCategory, Offering, Course, CourseFolders, Student, Quiz, Assignment, Exam, CourseOutline, Attendance, Lab, CourseMaterial, Assessment, Gradesheet
from .serializers import ProgramSerializer, FacultySerializer, CourseCategorySerializer, OfferingSerializer, CourseSerializer, CourseFoldersSerializer, StudentSerializer, QuizSerializer, AssignmentSerializer, ExamSerializer, CourseOutlineSerializer, AttendanceSerializer, LabSerializer, CourseMaterialSerializer, AssessmentSerializer, GradesheetSerializer

# Program Views
class ProgramListCreateView(generics.ListCreateAPIView):
    serializer_class = ProgramSerializer

    def get_queryset(self):
        role = self.request.query_params.get('role', None)
        user_id = self.request.query_params.get('user_id', None)

        if role and user_id:
            if role == 'hod':
                return Program.objects.filter(hod=user_id)
            elif role == 'qch':
                return Program.objects.filter(qch=user_id)
            elif role == 'manager':
                return Program.objects.filter(manager=user_id)
            elif role == 'instructor':
                return Program.objects.filter(instructor=user_id)
        return Program.objects.all()

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

class CurrentOfferingsListView(generics.ListAPIView):
    serializer_class = OfferingSerializer

    def get_queryset(self):
        today = date.today()
        return Offering.objects.filter(ending_date__gte=today)

# Course Views
class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

# Course Folders Views
class CourseFoldersByOfferingView(generics.ListCreateAPIView):
    serializer_class = CourseFoldersSerializer

    def get_queryset(self):
        # Ensure the program exists and fetch offerings for it
        offering_id = self.kwargs.get('offering_id')
        if not Offering.objects.filter(id=offering_id).exists():
            raise NotFound(detail="Offering not found")
        return CourseFolders.objects.filter(course_offering_id=offering_id)

class StudentEnrolledCoursesView(APIView):
    def get(self, request, student_id):
        try:
            # Use `user_id` instead of `id` to fetch the student
            student = Student.objects.get(user_id=student_id)
            enrolled_courses = student.course_folders_enrolled.all()
            serializer = CourseFoldersSerializer(enrolled_courses, many=True)
            return Response(serializer.data)
        except Student.DoesNotExist:
            return Response({"detail": "Student not found"}, status=404)

class CourseFoldersListCreateView(generics.ListCreateAPIView):
    queryset = CourseFolders.objects.all()
    serializer_class = CourseFoldersSerializer

class CourseFoldersDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseFolders.objects.all()
    serializer_class = CourseFoldersSerializer

# Student Views
class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

# Quiz Views
class QuizListCreateView(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

# Fetch quizzes based on course_id (folder ID)
class QuizzesByFolderView(generics.ListAPIView):
    serializer_class = QuizSerializer

    def get_queryset(self):
        folder_id = self.kwargs['folder_id']
        return Quiz.objects.filter(course_id=folder_id)


# Upload or update a specific file in a quiz
class QuizFileUploadView(generics.UpdateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = QuizSerializer

    def put(self, request, quiz_id, *args, **kwargs):
        quiz = get_object_or_404(Quiz, quiz_id=quiz_id)
        file_field = request.data.get("file_field")

        if file_field not in ["question", "solution", "best", "average", "worst"]:
            return Response({"error": "Invalid file field"}, status=status.HTTP_400_BAD_REQUEST)

        setattr(quiz, file_field, request.FILES.get("file"))
        quiz.save()

        return Response(self.get_serializer(quiz).data, status=status.HTTP_200_OK)

# Delete a specific file from a quiz
class QuizFileDeleteView(generics.UpdateAPIView):
    serializer_class = QuizSerializer

    def put(self, request, quiz_id, *args, **kwargs):
        quiz = get_object_or_404(Quiz, quiz_id=quiz_id)
        file_field = request.data.get("file_field")

        if file_field not in ["question", "solution", "best", "average", "worst"]:
            return Response({"error": "Invalid file field"}, status=status.HTTP_400_BAD_REQUEST)

        # Delete the file
        setattr(quiz, file_field, None)
        quiz.save()

        return Response(self.get_serializer(quiz).data, status=status.HTTP_200_OK)

# Assignment Views
class AssignmentListCreateView(generics.ListCreateAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

class AssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

# Fetch assignments based on course_id (folder ID)
class AssignmentsByFolderView(generics.ListAPIView):
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        folder_id = self.kwargs['folder_id']
        return Assignment.objects.filter(course_id=folder_id)


# Upload or update a specific file in an assignment
class AssignmentFileUploadView(generics.UpdateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = AssignmentSerializer

    def put(self, request, assignment_id, *args, **kwargs):
        assignment = get_object_or_404(Assignment, assignment_id=assignment_id)
        file_field = request.data.get("file_field")

        if file_field not in ["question", "solution", "best", "average", "worst"]:
            return Response({"error": "Invalid file field"}, status=status.HTTP_400_BAD_REQUEST)

        setattr(assignment, file_field, request.FILES.get("file"))
        assignment.save()

        return Response(self.get_serializer(assignment).data, status=status.HTTP_200_OK)

# Delete a specific file from an assignment
class AssignmentFileDeleteView(generics.UpdateAPIView):
    serializer_class = AssignmentSerializer

    def put(self, request, assignment_id, *args, **kwargs):
        assignment = get_object_or_404(Assignment, assignment_id=assignment_id)
        file_field = request.data.get("file_field")

        if file_field not in ["question", "solution", "best", "average", "worst"]:
            return Response({"error": "Invalid file field"}, status=status.HTTP_400_BAD_REQUEST)

        # Delete the file
        setattr(assignment, file_field, None)
        assignment.save()

        return Response(self.get_serializer(assignment).data, status=status.HTTP_200_OK)

# Exam Views
class ExamListCreateView(generics.ListCreateAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

class ExamDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

# Fetch exams based on course_id (folder ID)
class ExamsByFolderView(generics.ListAPIView):
    serializer_class = ExamSerializer

    def get_queryset(self):
        folder_id = self.kwargs['folder_id']
        return Exam.objects.filter(course_id=folder_id)

# Upload or update a specific file in an exam
class ExamFileUploadView(generics.UpdateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = ExamSerializer

    def put(self, request, exam_id, *args, **kwargs):
        exam = get_object_or_404(Exam, exam_id=exam_id)
        file_field = request.data.get("file_field")

        if file_field not in ["question", "solution", "best", "average", "worst"]:
            return Response({"error": "Invalid file field"}, status=status.HTTP_400_BAD_REQUEST)

        setattr(exam, file_field, request.FILES.get("file"))
        exam.save()

        return Response(self.get_serializer(exam).data, status=status.HTTP_200_OK)

# Delete a specific file from an exam
class ExamFileDeleteView(generics.UpdateAPIView):
    serializer_class = ExamSerializer

    def put(self, request, exam_id, *args, **kwargs):
        exam = get_object_or_404(Exam, exam_id=exam_id)
        file_field = request.data.get("file_field")

        if file_field not in ["question", "solution", "best", "average", "worst"]:
            return Response({"error": "Invalid file field"}, status=status.HTTP_400_BAD_REQUEST)

        # Delete the file
        setattr(exam, file_field, None)
        exam.save()

        return Response(self.get_serializer(exam).data, status=status.HTTP_200_OK)

# CourseOutline Views
class CourseOutlineListCreateView(generics.ListCreateAPIView):
    queryset = CourseOutline.objects.all()
    serializer_class = CourseOutlineSerializer

class CourseOutlineDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseOutline.objects.all()
    serializer_class = CourseOutlineSerializer

# CourseOutline Upload API
class CourseOutlineUploadView(generics.UpdateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = CourseOutlineSerializer

    def put(self, request, folder_id, *args, **kwargs):
        course_folder = get_object_or_404(CourseFolders, id=folder_id)
        existing_outline, created = CourseOutline.objects.get_or_create(course_id=course_folder)

        serializer = self.get_serializer(existing_outline, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Fetch course outlines based on course_id (folder ID)
class CourseOutlineByFolderView(generics.ListAPIView):
    serializer_class = CourseOutlineSerializer

    def get_queryset(self):
        folder_id = self.kwargs['folder_id']
        return CourseOutline.objects.filter(course_id=folder_id)

class CourseOutlineDeleteView(generics.DestroyAPIView):
    def delete(self, request, folder_id, *args, **kwargs):
        course_folder = get_object_or_404(CourseFolders, id=folder_id)
        course_outline = get_object_or_404(CourseOutline, course_id=course_folder)
        course_outline.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CourseOutlineDeleteView(generics.DestroyAPIView):
    def delete(self, request, folder_id, *args, **kwargs):
        course_folder = get_object_or_404(CourseFolders, id=folder_id)
        course_outline = get_object_or_404(CourseOutline, course_id=course_folder)
        course_outline.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Attendance Views
class AttendanceListCreateView(generics.ListCreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class AttendanceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

# Attendance Upload API
class AttendanceUploadView(generics.UpdateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = AttendanceSerializer

    def put(self, request, folder_id, *args, **kwargs):
        course_folder = get_object_or_404(CourseFolders, id=folder_id)
        existing_attendance, created = Attendance.objects.get_or_create(course_id=course_folder)

        serializer = self.get_serializer(existing_attendance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Fetch attendance based on course_id (folder ID)
class AttendanceByFolderView(generics.ListAPIView):
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        folder_id = self.kwargs['folder_id']
        return Attendance.objects.filter(course_id=folder_id)


class AttendanceDeleteView(generics.DestroyAPIView):
    def delete(self, request, folder_id, *args, **kwargs):
        course_folder = get_object_or_404(CourseFolders, id=folder_id)
        attendance = get_object_or_404(Attendance, course_id=course_folder)
        attendance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Lab Views
class LabListCreateView(generics.ListCreateAPIView):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer

class LabDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer

# Fetch labs based on course_id (folder ID)
class LabsByFolderView(generics.ListAPIView):
    serializer_class = LabSerializer

    def get_queryset(self):
        folder_id = self.kwargs['folder_id']
        return Lab.objects.filter(course_id=folder_id)

# Upload or update a specific file in a lab
class LabFileUploadView(generics.UpdateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = LabSerializer

    def put(self, request, id, *args, **kwargs):
        lab = get_object_or_404(Lab, id=id)
        file_field = request.data.get("file_field")

        # Validate the file field
        if file_field not in ["question", "solution"]:
            return Response({"error": "Invalid file field"}, status=status.HTTP_400_BAD_REQUEST)

        # Update the lab file
        setattr(lab, file_field, request.FILES.get("file"))
        lab.save()

        return Response(self.get_serializer(lab).data, status=status.HTTP_200_OK)

# Delete a specific file from a lab
class LabFileDeleteView(generics.UpdateAPIView):
    serializer_class = LabSerializer

    def put(self, request, *args, **kwargs):
        lab_id = kwargs.get('id')
        lab = get_object_or_404(Lab, id=lab_id)
        file_field = request.data.get("file_field")

        # Validate the file field
        if file_field not in ["question", "solution"]:
            return Response({"error": "Invalid file field"}, status=status.HTTP_400_BAD_REQUEST)

        # Delete the file
        setattr(lab, file_field, None)
        lab.save()

        return Response(self.get_serializer(lab).data, status=status.HTTP_200_OK)

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

# Fetch assessments based on course_id (folder ID)
class AssessmentsByFolderView(generics.ListAPIView):
    serializer_class = AssessmentSerializer

    def get_queryset(self):
        folder_id = self.kwargs['folder_id']
        return Assessment.objects.filter(course_id=folder_id)

# Upload or update a specific file in an assessment
class AssessmentFileUploadView(generics.UpdateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = AssessmentSerializer

    def put(self, request, assessment_id, *args, **kwargs):
        assessment = get_object_or_404(Assessment, id=assessment_id)
        file_field = request.data.get("file_field")

        if file_field not in ["question", "solution", "best", "average", "worst"]:
            return Response({"error": "Invalid file field"}, status=status.HTTP_400_BAD_REQUEST)

        setattr(assessment, file_field, request.FILES.get("file"))
        assessment.save()

        return Response(self.get_serializer(assessment).data, status=status.HTTP_200_OK)

# Delete a specific file from an assessment
class AssessmentFileDeleteView(generics.UpdateAPIView):
    serializer_class = AssessmentSerializer

    def put(self, request, assessment_id, *args, **kwargs):
        assessment = get_object_or_404(Assessment, id=assessment_id)
        file_field = request.data.get("file_field")

        if file_field not in ["question", "solution", "best", "average", "worst"]:
            return Response({"error": "Invalid file field"}, status=status.HTTP_400_BAD_REQUEST)

        setattr(assessment, file_field, None)
        assessment.save()

        return Response(self.get_serializer(assessment).data, status=status.HTTP_200_OK)

# Gradesheet Views
class GradesheetListCreateView(generics.ListCreateAPIView):
    queryset = Gradesheet.objects.all()
    serializer_class = GradesheetSerializer

class GradesheetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Gradesheet.objects.all()
    serializer_class = GradesheetSerializer


# GradeSheet Upload API
class GradesheetUploadView(generics.UpdateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = GradesheetSerializer

    def put(self, request, folder_id, *args, **kwargs):
        course_folder = get_object_or_404(CourseFolders, id=folder_id)
        existing_gradesheet, created = Gradesheet.objects.get_or_create(course_id=course_folder)

        serializer = self.get_serializer(existing_gradesheet, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Fetch grade sheets based on course_id (folder ID)
class GradesheetByFolderView(generics.ListAPIView):
    serializer_class = GradesheetSerializer

    def get_queryset(self):
        folder_id = self.kwargs['folder_id']
        return Gradesheet.objects.filter(course_id=folder_id)

class GradesheetDeleteView(generics.DestroyAPIView):
    def delete(self, request, folder_id, *args, **kwargs):
        course_folder = get_object_or_404(CourseFolders, id=folder_id)
        gradesheet = get_object_or_404(Gradesheet, course_id=course_folder)
        gradesheet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)