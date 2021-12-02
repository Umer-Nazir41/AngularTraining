import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SpinnerService } from '../service/spinner/spinner.service';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  //SPINNER AND HEADER COMPONENT
  constructor(
    private spinner: SpinnerService,
    private authService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Interception In Progress');

    //DISPLAY SPINNER
    this.spinner.show();

    //CLONE REQUEST TO INJECT HEADER TOKEN
    request = request.clone({
      setHeaders: {
        Authorization: `${this.authService.token}`,
      },
    });

    return next.handle(request).pipe(
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
