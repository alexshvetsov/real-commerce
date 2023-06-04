import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Server response arrived');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errMsg = '';
        // Client Side Error
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.error.message}`;
        }
        // Server Side Error
        else {
          const status = error.status;
          if (status === 400) {
            errMsg = 'Bad Request';
          } else if (status === 401) {
            errMsg = 'Unauthorized';
          } else if (status === 500) {
            errMsg = 'Internal Server Error';
          } else {
            errMsg = `Error Code: ${status},  Message: ${error.message}`;
          }
        }
        this.snackBar.open(errMsg, 'close', {
          verticalPosition: 'top',
        });
        return throwError(() => error);
      })
    );
  }
}
