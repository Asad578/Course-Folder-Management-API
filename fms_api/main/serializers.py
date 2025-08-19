from rest_framework import serializers
from .models import (
    Program, Faculty, CourseCategory, Offering, Course, CourseFolders,
    Student, Quiz, Assignment, Exam, CourseOutline, Attendance,
    Lab, CourseMaterial, Assessment, Gradesheet
)

# Program Serializer
class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'

# Faculty Serializer
class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'

# CourseCategory Serializer
class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = '__all__'

# Offering Serializer
class OfferingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offering
        fields = '__all__'

# Course Serializer
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

# Course Folder Serializer
class CourseFoldersSerializer(serializers.ModelSerializer):
    course_offering = OfferingSerializer()

    class Meta:
        model = CourseFolders
        fields = '__all__'

# Student Serializer
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

# Quiz Serializer
class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

# Assignment Serializer
class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

# Exam Serializer
class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

# CourseOutline Serializer
class CourseOutlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseOutline
        fields = '__all__'

# Attendance Serializer
class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

# Lab Serializer
class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = '__all__'

# CourseMaterial Serializer
class CourseMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMaterial
        fields = '__all__'

# Assessment Serializer
class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'

# Gradesheet Serializer
class GradesheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gradesheet
        fields = '__all__'
