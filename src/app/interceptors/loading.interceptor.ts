import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  // Show spinner before request starts
  loadingService.show();

  return next(req).pipe(
    // Hide spinner once request completes (success, error, or cancel)
    finalize(() => {
      loadingService.hide();
    })
  );
};
