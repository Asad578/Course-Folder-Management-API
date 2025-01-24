from django.db import models

# Program Model
class Program(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    path = models.CharField(max_length=100, default='default-path')

# Faculty Model
class Faculty(models.Model):
    user_id = models.AutoField(primary_key=True)
    fullname=models.CharField(max_length=100)
    sap_id = models.IntegerField(unique=True)
    email=models.CharField(max_length=100, unique=True)
    password=models.CharField(max_length=100)
    role=models.CharField(max_length=100)

# Course Category Model
class CourseCategory(models.Model):
    id = models.AutoField(primary_key=True)
    course_id = models.IntegerField(unique=True)
    course_name = models.CharField(max_length=100)
    credits = models.IntegerField()
    category = models.CharField(max_length=100)
    image = models.FileField(upload_to='course_images/', null=True, blank=True)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, null=True, blank=True)


# Course Offerings Model
class Offering(models.Model):
    id = models.AutoField(primary_key=True)
    session=models.CharField(max_length=100)
    media=models.FileField(upload_to='offerings_media/' , null=True, blank=True)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, null=True, blank=True)

# Course Folder Model
class Course(models.Model):
    id = models.AutoField(primary_key=True)
    folder_name = models.CharField(max_length=100, unique= True, default='course-name')
    course_title=models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    course_offering=models.ForeignKey(Offering, on_delete=models.CASCADE)

# CourseFaculty Model (Many-to-Many relationship between FacultyMember and Course)
class CourseFaculty(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

# Student Model
class Student(models.Model):
    user_id = models.AutoField(primary_key=True)
    fullname=models.CharField(max_length=100)
    sap_id = models.IntegerField(unique=True)
    email=models.CharField(max_length=100, unique=True)
    password=models.CharField(max_length=100)

# CourseStudents Model (Many-to-Many relationship between Student and Course)
class CourseStudent(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Student, on_delete=models.CASCADE)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

# Quiz Model
class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    quiz_no = models.IntegerField()
    description = models.TextField()
    media = models.FileField(upload_to='quiz_media/', null=True, blank=True)
    total_marks = models.IntegerField()
    obtained_marks = models.IntegerField( null=True, blank=True)
    solution = models.FileField(upload_to='solution/', null=True, blank=True)
    best = models.FileField(upload_to='best/', null=True, blank=True)
    average = models.FileField(upload_to='average/', null=True, blank=True)
    worst = models.FileField(upload_to='worst/', null=True, blank=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

# Assignment Model
class Assignment(models.Model):
    assignment_id = models.AutoField(primary_key=True)
    assignment_no = models.IntegerField()
    description = models.TextField()
    media = models.FileField(upload_to='assignment_media/', null=True, blank=True)
    total_marks = models.IntegerField()
    obtained_marks = models.IntegerField( null=True, blank=True)
    solution = models.FileField(upload_to='solution/', null=True, blank=True)
    best = models.FileField(upload_to='best/', null=True, blank=True)
    average = models.FileField(upload_to='average/', null=True, blank=True)
    worst = models.FileField(upload_to='worst/', null=True, blank=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

# Exam Model
class Exam(models.Model):
    exam_id = models.AutoField(primary_key=True)
    exam_name = models.CharField(max_length=100)
    exam_type = models.CharField(max_length=100)
    media = models.FileField(upload_to='exam_media/', null=True, blank=True)
    solution = models.FileField(upload_to='solution/', null=True, blank=True)
    total_marks = models.IntegerField()
    obtained_marks = models.IntegerField( null=True, blank=True)
    best = models.FileField(upload_to='best/', null=True, blank=True)
    average = models.FileField(upload_to='average/', null=True, blank=True)
    worst = models.FileField(upload_to='worst/', null=True, blank=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

# CourseOutline Model
class CourseOutline(models.Model):
    outline_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default='Outline')
    media = models.FileField(upload_to='course_outline/', null=True, blank=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)


# Attendance Model
class Attendance(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    media = models.FileField(upload_to='attendance_media/', null=True, blank=True)
    description = models.TextField( null=True, blank=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

# Lab Model
class Lab(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    media = models.FileField(upload_to='lab_media/', null=True, blank=True)
    solution = models.FileField(upload_to='solution/', null=True, blank=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

# CourseMaterial Model
class CourseMaterial(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    media = models.FileField(upload_to='course_materials/', null=True, blank=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

# Assessments Model
class Assessment(models.Model):
    id = models.AutoField(primary_key=True)
    assessment_name = models.CharField(max_length=100)
    media = models.FileField(upload_to='assessments/', null=True, blank=True)
    solution = models.FileField(upload_to='solution/', null=True, blank=True)
    total_marks = models.IntegerField()
    obtained_marks = models.IntegerField( null=True, blank=True)
    best = models.FileField(upload_to='best/', null=True, blank=True)
    average = models.FileField(upload_to='average/', null=True, blank=True)
    worst = models.FileField(upload_to='worst/', null=True, blank=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

# Gradesheet Model
class Gradesheet(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    media = models.FileField(upload_to='gradesheets/', null=True, blank=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

    
