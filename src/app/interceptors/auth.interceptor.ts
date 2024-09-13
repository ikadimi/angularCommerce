import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const router: Router = inject(Router);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // redirect to login page
            router.navigateByUrl('/login');
          }
          return throwError(error);
        })
      );
}