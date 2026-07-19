import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  // Get courses with filter mapping and error handling
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // Step 86: Retry failed requests up to 2 times
      retry(2),
      // Step 83: Filter out courses with credits <= 0
      map(courses => courses.filter(course => course.credits > 0)),
      // Step 85: Tap operator for logging side effects
      tap(courses => console.log('Courses loaded:', courses.length)),
      // Step 84: Catch error and throw custom error
      catchError(err => {
        console.error('Error fetching courses:', err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(err => {
        console.error(`Error fetching course ${id}:`, err);
        return throwError(() => new Error(`Failed to load course details. Please try again.`));
      })
    );
  }

  // Step 81: POST method
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(err => {
        console.error('Error creating course:', err);
        return throwError(() => new Error('Failed to create course.'));
      })
    );
  }

  // Step 82: PUT method
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      catchError(err => {
        console.error(`Error updating course ${course.id}:`, err);
        return throwError(() => new Error('Failed to update course.'));
      })
    );
  }

  // Step 82: DELETE method
  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error(`Error deleting course ${id}:`, err);
        return throwError(() => new Error('Failed to delete course.'));
      })
    );
  }
}
