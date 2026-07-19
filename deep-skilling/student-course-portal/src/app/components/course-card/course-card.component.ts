import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  // Step 21: Emit events up with @Output
  @Output() enrollRequested = new EventEmitter<number>();
  
  isExpanded: boolean = false;
  isEnrolled$: Observable<boolean>;

  constructor(private store: Store) {
    // Select enrolled IDs list and check if this course ID is inside
    this.isEnrolled$ = this.store.select(selectEnrolledIds).pipe(
      map(ids => ids.includes(this.course?.id))
    );
  }

  // Step 18: Log previous and current value of the course input whenever it changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      const prev = changes['course'].previousValue;
      const curr = changes['course'].currentValue;
      console.log('CourseCardComponent input changed:', {
        previous: prev,
        current: curr
      });
    }
  }

  // Step 32: Use a getter for the ngClass object binding
  get cardClasses() {
    let enrolledStatus = false;
    // We will check isEnrolled synchronously or pass it in.
    // Let's check from store/state if possible, or support the getter classes.
    return {
      'card--enrolled': this.course.gradeStatus === 'passed', // or if enrolled
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  // Step 30: Use ngStyle to set border color dynamically based on gradeStatus
  get leftBorderColor(): string {
    switch (this.course.gradeStatus) {
      case 'passed': return '#10b981'; // green
      case 'failed': return '#ef4444'; // red
      case 'pending':
      default:
        return '#6b7280'; // grey
    }
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollToggle(isEnrolled: boolean): void {
    if (isEnrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
      this.enrollRequested.emit(this.course.id);
    }
  }
}
