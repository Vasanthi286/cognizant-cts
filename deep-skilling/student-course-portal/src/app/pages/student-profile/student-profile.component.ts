import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';
import { unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  enrolledCourses$: Observable<Course[]>;
  totalCredits$: Observable<number>;

  // Mock student details
  studentInfo = {
    name: 'Alex Mercer',
    id: 'CS-2026-904',
    major: 'Computer Science & Software Systems',
    email: 'alex.mercer@academy.edu',
    academicStatus: 'Good Standing',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150'
  };

  constructor(private store: Store) {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
    
    // Select registered courses and reduce total credits
    this.totalCredits$ = this.enrolledCourses$.pipe(
      map(courses => courses.reduce((sum, course) => sum + course.credits, 0))
    );
  }

  ngOnInit(): void {}

  onUnenroll(courseId: number): void {
    if (confirm('Are you sure you want to unenroll from this course?')) {
      this.store.dispatch(unenrollFromCourse({ courseId }));
    }
  }
}
