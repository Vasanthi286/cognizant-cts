import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../../../models/course.model';
import { CourseService } from '../../../../services/course.service';
import { enrollInCourse } from '../../../../store/enrollment/enrollment.actions';
import { HasUnsavedChanges } from '../../../../guards/unsaved-changes.guard';

@Component({
  selector: 'app-reactive-enrollment',
  standalone: false, // Declared component inside EnrollmentModule
  templateUrl: './reactive-enrollment.component.html',
  styleUrls: ['./reactive-enrollment.component.css']
})
export class ReactiveEnrollmentComponent implements OnInit, HasUnsavedChanges {
  enrollForm!: FormGroup;
  courses$: Observable<Course[]>;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private store: Store,
    private router: Router
  ) {
    this.courses$ = this.courseService.getCourses();
  }

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['Alex Mercer', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['alex.mercer@academy.edu', [Validators.required, Validators.email]],
      courseId: ['', Validators.required],
      semester: ['Fall 2026', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }

  // Implementation of CanDeactivate Guard interface method
  hasUnsavedChanges(): boolean {
    // Returns true if the form is dirty and not submitted yet
    return this.enrollForm.dirty && !this.submitted;
  }

  // Easy getters for HTML validation access
  get f() { return this.enrollForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.enrollForm.invalid) {
      this.submitted = false;
      // Mark all controls touched to trigger visual validation
      this.enrollForm.markAllAsTouched();
      return;
    }

    const selectedCourseId = Number(this.enrollForm.value.courseId);
    
    // Dispatch action to NgRx Store
    this.store.dispatch(enrollInCourse({ courseId: selectedCourseId }));

    alert('Enrollment submitted successfully!');
    
    // Redirect to profile to see results
    this.router.navigate(['/profile']);
  }
}
