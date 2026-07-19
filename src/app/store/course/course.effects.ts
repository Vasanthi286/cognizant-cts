import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../../services/course.service';
import * as CourseActions from './course.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => CourseActions.loadCoursesSuccess({ courses })),
          catchError((error) => of(CourseActions.loadCoursesFailure({ error: error.message || 'Failed to fetch courses.' })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private courseService: CourseService
  ) {}
}
