import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Sends a GET request to the specified URL and returns an Observable of type T.
   * @param  url - The URL to send the GET request to.
   * @returns  - An Observable that emits the response data of type T.
   */
  getRequest<T>(url: string): Observable<T> {
    const httpOptions = this.setHeader();
    return this.http.get<T>(url, httpOptions).pipe(
      catchError((err: HttpErrorResponse): Observable<T> => {
        return this.handleError<T>(err);
      })
    );
  }

  /**
   * Sends a POST request to the specified URL with an optional model as the request body.
   * @param  url - The URL to send the request to.
   * @param model -The model object to include in the request body.
   * @returns - An observable that emits the response from the server.
   */
  postRequest<T>(url: string, model?: T): Observable<T> {
    const body = JSON.stringify(model);
    const httpOptions = this.setHeader();
    return this.http.post<T>(url, body, httpOptions).pipe(
      catchError((err: HttpErrorResponse): Observable<T> => {
        return this.handleError<T>(err);
      })
    );
  }

  /**
   * Sends a PUT request to the specified URL with the provided model as the request body.
   * @param  url - The URL to send the request to.
   * @param model - The model to include in the request body.
   * @returns  - An observable that emits the response from the server.
   */
  putRequest<T>(url: string, model: T): Observable<T> {
    const body = JSON.stringify(model);
    const httpOptions = this.setHeader();
    return this.http.put<T>(url, body, httpOptions).pipe(
      catchError((err: HttpErrorResponse): Observable<T> => {
        return this.handleError<T>(err);
      })
    );
  }

  /**
   * Sets the headers for an HTTP request.
   * @returns - The HTTP options object with the headers set.
   */
  private setHeader() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Access-Control-Allow-Origin', '*');

    const httpOptions = {
      headers,
    };
    return httpOptions;
  }

  /**
   * Handles HTTP errors and returns an Observable with the appropriate error message.
   *T - The type of data expected in the response.
   * @param  error - The HTTP error response object.
   * @returns - An Observable that emits an error with the appropriate message.
   */
  private handleError<T>(error: HttpErrorResponse): Observable<T> {
    if (error.status === 500) {
      return throwError(
        () => new Error(error.error?.message || 'Server Error')
      );
    }

    if (error.status === 400) {
      return throwError(() => new Error(error.error?.message || 'Bad Request'));
    }

    if (error.status === 300) {
      return throwError(() => new Error(error.error?.message || 'Ambiguous'));
    }

    if (error.status === 401) {
      return throwError(
        () => new Error(error.error?.message || 'Unauthorized')
      );
    }

    if (error.status === 403) {
      return throwError(
        () => new Error(error.error?.message || 'Access Denied')
      );
    }

    if (error.status === 404) {
      return throwError(() => new Error(error.error?.message || 'Not Found'));
    }

    if (error.status === 502) {
      return throwError(() => new Error(error.error?.message || 'Bad Gateway'));
    }

    if (error.status === 503) {
      return throwError(
        () => new Error(error.error?.message || 'Service Unavailable')
      );
    }

    return throwError(() => new Error(error.error?.message || 'Unknown error'));
  }
}
