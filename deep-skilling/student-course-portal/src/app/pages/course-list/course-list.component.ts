import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesError, selectCoursesLoading } from '../../store/course/course.selectors';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CourseCardComponent, CourseSummaryWidgetComponent],
  providers: [NotificationService], // Scoped notification service provider demonstration
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  
  // Local state subjects for filtering
  private searchSubject = new BehaviorSubject<string>('');
  private statusSubject = new BehaviorSubject<string>('');
  private creditSubject = new BehaviorSubject<number | null>(null);

  filteredCourses$: Observable<Course[]>;
  notifications: string[] = [];

  constructor(
    private store: Store,
    public notificationService: NotificationService
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);

    // Combine courses stream with filter criteria subjects
    this.filteredCourses$ = combineLatest([
      this.courses$,
      this.searchSubject,
      this.statusSubject,
      this.creditSubject
    ]).pipe(
      map(([courses, search, status, credits]) => {
        return courses.filter((course) => {
          const matchSearch =
            course.name.toLowerCase().includes(search.toLowerCase()) ||
            course.code.toLowerCase().includes(search.toLowerCase());
          
          const matchStatus = !status || course.gradeStatus === status;
          const matchCredits = credits === null || course.credits === credits;
          
          return matchSearch && matchStatus && matchCredits;
        });
      })
    );
  }

  ngOnInit(): void {
    // Dispatch action to load courses list from server
    this.store.dispatch(loadCourses());
    
    // Add default initial notification
    this.notificationService.addNotification('Course catalog synced successfully.');
    this.notifications = this.notificationService.getNotifications();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  onStatusFilter(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.statusSubject.next(value);
  }

  onCreditFilter(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const numValue = value === '' ? null : Number(value);
    this.creditSubject.next(numValue);
  }

  onEnrollNotification(courseId: number): void {
    // Notify when child event emits enroll
    this.courses$.pipe(
      map(courses => courses.find(c => c.id === courseId))
    ).subscribe(course => {
      if (course) {
        this.notificationService.addNotification(`Requested enrollment for ${course.code}: ${course.name}`);
        this.notifications = this.notificationService.getNotifications();
      }
    });
  }

  clearNotifications(): void {
    this.notificationService.clear();
    this.notifications = [];
  }
}
