import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];
  private cachedCourses: Course[] = [];

  constructor(private courseService: CourseService) {
    // Cache the courses list for synchronous lookup in getEnrolledCourses()
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.cachedCourses = courses;
      },
      error: (err) => {
        console.error('EnrollmentService failed to load courses cache:', err);
      }
    });
  }

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
      console.log('Enrolled in course:', courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
    console.log('Unenrolled from course:', courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    return this.cachedCourses.filter(course => this.enrolledCourseIds.includes(course.id));
  }
}
