import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course!: Course;
  loading: boolean = true;
  errorMsg: string | null = null;
  isEnrolled$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Get parameters map, fetch course detail
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        this.loading = true;
        this.errorMsg = null;
        
        // Setup enrolled check observable
        this.isEnrolled$ = this.store.select(selectEnrolledIds).pipe(
          map(ids => ids.includes(id))
        );

        return this.courseService.getCourseById(id);
      })
    ).subscribe({
      next: (course) => {
        this.course = course;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = err.message || 'Course not found.';
        this.loading = false;
      }
    });
  }

  onToggleEnroll(isCurrentlyEnrolled: boolean): void {
    if (isCurrentlyEnrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
    }
  }

  // Helper mock content getters based on course names to make details feel extremely rich
  getCourseDescription(): string {
    return `This curriculum provides an in-depth, hands-on exploration of the core concepts in ${this.course?.name || 'this course'}. Designed for senior and graduate students looking to excel in advanced software development.`;
  }

  getCoursePrerequisites(): string[] {
    if (this.course?.code.startsWith('CS1') || this.course?.code.startsWith('SE1')) {
      return ['None (Introduction Level)'];
    }
    return ['Basic Programming Fundamentals', 'Data Structures & Algorithms (Recommended)'];
  }

  getSyllabusWeeks(): string[] {
    return [
      'Week 01-02: Foundations and Core Concepts',
      'Week 03-04: Architectural Paradigms and Design Patterns',
      'Week 05-06: Hands-on Laboratory Tasks & Projects',
      'Week 07-08: Practical Scaling and Distributed Systems',
      'Week 09-10: Advanced Optimization & Final Capstone Project'
    ];
  }
}
