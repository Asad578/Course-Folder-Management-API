from django.db import models

# Faculty Model
class Faculty(models.Model):
    ROLE_CHOICES = [
        ('hod', 'Head of Department'),
        ('manager', 'Manager'),
        ('qch', 'Quality Control Head'),
        ('instructor', 'Instructor'),
    ]
    user_id = models.AutoField(primary_key=True)
    fullname=models.CharField(max_length=100)
    sap_id = models.IntegerField(unique=True)
    email=models.CharField(max_length=100, unique=True)
    password=models.CharField(max_length=100)
    role=models.CharField(max_length=100, choices=ROLE_CHOICES)
    user_type = models.CharField(max_length=10, default='faculty')
    def is_hod(self):
        return self.role.lower() == 'hod'

    def is_manager(self):
        return self.role.lower() == 'manager'

    def is_qch(self):
        return self.role.lower() == 'qch'

    def is_instructor(self):
        return self.role.lower() == 'instructor'

# Program Model
class Program(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    hod = models.IntegerField(null=True, blank=True)
    qch = models.IntegerField(null=True, blank=True)
    manager = models.IntegerField(null=True, blank=True)
    instructor = models.IntegerField(null=True, blank=True)

# Student Model
class Student(models.Model):
    user_id = models.AutoField(primary_key=True)
    fullname=models.CharField(max_length=100)
    sap_id = models.IntegerField(unique=True)
    email=models.CharField(max_length=100, unique=True)
    password=models.CharField(max_length=100)
    user_type = models.CharField(max_length=10, default='student')
    program = models.ForeignKey(Program, on_delete=models.CASCADE, null=True, blank=True)

# Course Category Model
class CourseCategory(models.Model):
    id = models.AutoField(primary_key=True)
    course_id = models.CharField(max_length=20, unique=True)
    course_name = models.CharField(max_length=100)
    credits = models.IntegerField()
    category = models.CharField(max_length=100)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, null=True, blank=True)

# Course Offerings Model
class Offering(models.Model):
    id = models.AutoField(primary_key=True)
    session=models.CharField(max_length=100)
    starting_date=models.DateField(null=True, blank=True)
    ending_date=models.DateField(null=True, blank=True)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, null=True, blank=True)

# Offering Courses Model
class Course(models.Model):
    id = models.AutoField(primary_key=True)
    course_title=models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    course_offering=models.ForeignKey(Offering, on_delete=models.CASCADE)

# Course Folders Model
class CourseFolders(models.Model):
    id = models.AutoField(primary_key=True)
    folder_name = models.CharField(max_length=100)
    credits = models.IntegerField()
    course_offering=models.ForeignKey(Offering, on_delete=models.CASCADE)
    course_instructor = models.IntegerField(null=True, blank=True)
    lab_instructor = models.IntegerField( null=True, blank=True)
    students = models.ManyToManyField(Student, related_name='course_folders_enrolled', blank=True)

# Quiz Model
class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    quiz_no = models.IntegerField()
    question = models.FileField(upload_to='question/', null=True, blank=True)
    total_marks = models.IntegerField(null=True, blank=True)
    solution = models.FileField(upload_to='solution/', null=True, blank=True)
    best = models.FileField(upload_to='best/', null=True, blank=True)
    average = models.FileField(upload_to='average/', null=True, blank=True)
    worst = models.FileField(upload_to='worst/', null=True, blank=True)
    course_id = models.ForeignKey(CourseFolders, on_delete=models.CASCADE)

# Assignment Model
class Assignment(models.Model):
    assignment_id = models.AutoField(primary_key=True)
    assignment_no = models.IntegerField()
    question = models.FileField(upload_to='question/', null=True, blank=True)
    total_marks = models.IntegerField(null=True, blank=True)
    solution = models.FileField(upload_to='solution/', null=True, blank=True)
    best = models.FileField(upload_to='best/', null=True, blank=True)
    average = models.FileField(upload_to='average/', null=True, blank=True)
    worst = models.FileField(upload_to='worst/', null=True, blank=True)
    course_id = models.ForeignKey(CourseFolders, on_delete=models.CASCADE)

# Exam Model
class Exam(models.Model):
    exam_id = models.AutoField(primary_key=True)
    exam_name = models.CharField(max_length=100)
    question = models.FileField(upload_to='question/', null=True, blank=True)
    solution = models.FileField(upload_to='solution/', null=True, blank=True)
    total_marks = models.IntegerField(null=True, blank=True)
    best = models.FileField(upload_to='best/', null=True, blank=True)
    average = models.FileField(upload_to='average/', null=True, blank=True)
    worst = models.FileField(upload_to='worst/', null=True, blank=True)
    course_id = models.ForeignKey(CourseFolders, on_delete=models.CASCADE)

# CourseOutline Model
class CourseOutline(models.Model):
    outline_id = models.AutoField(primary_key=True)
    media = models.FileField(upload_to='course_outline/', null=True, blank=True)
    course_id = models.ForeignKey(CourseFolders, on_delete=models.CASCADE)


# Attendance Model
class Attendance(models.Model):
    id = models.AutoField(primary_key=True)
    media = models.FileField(upload_to='attendance_media/', null=True, blank=True)
    course_id = models.ForeignKey(CourseFolders, on_delete=models.CASCADE)

# Lab Model
class Lab(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    question = models.FileField(upload_to='question/', null=True, blank=True)
    solution = models.FileField(upload_to='solution/', null=True, blank=True)
    course_id = models.ForeignKey(CourseFolders, on_delete=models.CASCADE)

# CourseMaterial Model
class CourseMaterial(models.Model):
    id = models.AutoField(primary_key=True)
    media = models.FileField(upload_to='course_materials/', null=True, blank=True)
    course_id = models.ForeignKey(CourseFolders, on_delete=models.CASCADE)

# Assessments Model
class Assessment(models.Model):
    id = models.AutoField(primary_key=True)
    assessment_name = models.CharField(max_length=100)
    question = models.FileField(upload_to='question/', null=True, blank=True)
    solution = models.FileField(upload_to='solution/', null=True, blank=True)
    total_marks = models.IntegerField(null=True, blank=True)
    best = models.FileField(upload_to='best/', null=True, blank=True)
    average = models.FileField(upload_to='average/', null=True, blank=True)
    worst = models.FileField(upload_to='worst/', null=True, blank=True)
    course_id = models.ForeignKey(CourseFolders, on_delete=models.CASCADE)

# Gradesheet Model
class Gradesheet(models.Model):
    id = models.AutoField(primary_key=True)
    media = models.FileField(upload_to='gradesheets/', null=True, blank=True)
    course_id = models.ForeignKey(CourseFolders, on_delete=models.CASCADE)

    
