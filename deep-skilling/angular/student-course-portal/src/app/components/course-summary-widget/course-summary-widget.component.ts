import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.component.html',
  styleUrls: ['./course-summary-widget.component.css']
})
export class CourseSummaryWidgetComponent implements OnInit {
  coursesCount: number = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.updateCount();
  }

  updateCount(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.coursesCount = courses.length;
      }
    });
  }

  addDemoCourse(): void {
    const randomId = Math.floor(Math.random() * 1000) + 100;
    const demoCourse: Course = {
      id: randomId,
      name: `Special Seminar ${randomId}`,
      code: `CS${randomId}`,
      credits: Math.floor(Math.random() * 3) + 2, // 2 to 4 credits
      gradeStatus: 'pending'
    };

    // Step 81: Call createCourse which uses POST on backend
    this.courseService.createCourse(demoCourse).subscribe({
      next: (newCourse) => {
        console.log('Demo course created via widget:', newCourse);
        this.updateCount();
      },
      error: (err) => {
        console.error('Failed to create demo course in widget:', err);
        // Fallback for purely offline demo logic (pre-HTTP)
        alert('Could not connect to mock server API. Run "json-server" to test live creations.');
      }
    });
  }
}
