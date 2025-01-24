from django.contrib import admin

from .models import (Program, Faculty, CourseCategory, Offering, Course, CourseFaculty, Student, 
                     CourseStudent, Quiz, Assignment, Exam, CourseOutline, Attendance, 
                     Lab, CourseMaterial, Assessment, Gradesheet)

admin.site.register(Program)
admin.site.register(Faculty)
admin.site.register(CourseCategory)
admin.site.register(Offering)
admin.site.register(Course)
admin.site.register(CourseFaculty)
admin.site.register(Student)
admin.site.register(CourseStudent)
admin.site.register(Quiz)
admin.site.register(Assignment)
admin.site.register(Exam)
admin.site.register(CourseOutline)
admin.site.register(Attendance)
admin.site.register(Lab)
admin.site.register(CourseMaterial)
admin.site.register(Assessment)
admin.site.register(Gradesheet)


