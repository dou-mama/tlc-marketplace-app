import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getListings(): Observable<any> {
    const url = this.baseUrl + '/listings';
    return this.http.get(url).pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Error Code: ${error.status}\n Message: ${error.message}`);
    return throwError(() => new Error('Error submitting request to backend: ' + error.message));
  }
}
