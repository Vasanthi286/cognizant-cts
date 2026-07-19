import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.warn('Unauthorized request (401) - redirecting to home...');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('Internal Server Error (500) encountered.');
        alert('A global server error occurred (500). Please try again later.');
      }
      return throwError(() => error);
    })
  );
};
