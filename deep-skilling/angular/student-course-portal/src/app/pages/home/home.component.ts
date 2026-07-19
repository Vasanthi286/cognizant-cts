import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CourseSummaryWidgetComponent],
  providers: [NotificationService], // Scoped notification service provider demonstration
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  enrolledCourses$: Observable<Course[]>;
  totalCredits$: Observable<number>;
  isLoggedIn$: Observable<boolean>;
  notifications: string[] = [];

  studentInfo = {
    name: 'Alex Mercer',
    major: 'Computer Science & Software Systems',
    status: 'Active'
  };

  constructor(
    private store: Store,
    private authService: AuthService,
    public notificationService: NotificationService
  ) {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    
    // Select registered courses and reduce total credits
    this.totalCredits$ = this.enrolledCourses$.pipe(
      map(courses => courses.reduce((sum, course) => sum + course.credits, 0))
    );
  }

  ngOnInit(): void {
    // Add notifications to scoped service instance
    this.notificationService.addNotification('Welcome back, Alex. Your dashboard is synced.');
    this.notificationService.addNotification('Midterm evaluations will open next month.');
    
    this.notifications = this.notificationService.getNotifications();
  }

  clearNotifications(): void {
    this.notificationService.clear();
    this.notifications = [];
  }
}
