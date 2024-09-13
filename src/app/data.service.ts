import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
// import { Observable } from 'rxjs/dist/types/internal/Observable';
// import { Observable } from 'rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  private baseUrl = 'http://localhost:48550/api/v1'; // URL of your Node.js backend

  private loggedIn = new BehaviorSubject<boolean>(false); // Tracks the user's login status
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    // this.checkLoginStatus();
  }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // Attempt to access a protected route to determine if user is logged in
    const protectedURL = this.baseUrl + 'users/';
    this.http.get(protectedURL, { withCredentials: true }).subscribe({
      next: () => {
        this.loggedIn.next(true);
      },
      error: () => {
        this.loggedIn.next(false);
      }
    });
  }

  getMessage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  login(loginInfo: any): any {
    const url = this.baseUrl + '/users/login';
    // console.log("calling this url: " + url);
    return this.http.post(url, loginInfo).pipe(
      tap({
        next: () => {
          this.loggedIn.next(true);
        },
        error: (err: HttpErrorResponse) => {
          this.loggedIn.next(false);
          this.handleError(err);
        }
      })
    )
  }

  logout(): any {
    console.log('logging out');
    const url = 'http://127.0.0.1:48550/api/v1/users/logout';
    // console.log('visiting log out route: ' + url);
    return this.http.post(url, {}, {withCredentials: true}).pipe(
      tap({
        next: () => {
          console.log('backend call successful');
        },
        error: (err: HttpErrorResponse) => {
          this.loggedIn.next(false);
          this.handleError(err);
        }
      })
    )
  }

  signUp(signupInfo: any): Observable<any> {
    const url = this.baseUrl + '/users/register';
    console.log("calling this url: " + url);
    return this.http.post(url, signupInfo).pipe(catchError(this.handleError))
  }

  createListing(listingForm: any): Observable<any> {
    const url = this.baseUrl + '/listings';
    return this.http.post(url, listingForm).pipe(catchError(this.handleError));
  }

  getListings(): Observable<any> {
    const url = this.baseUrl + '/listings';
    return this.http.get(url).pipe(catchError(this.handleError))
  }

  getListing(id: any): Observable<any> {
    const url = this.baseUrl + '/listings/' + id;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse){
    console.error(`Error Code: ${error.status}\n Message: ${error.message}`)
    return throwError('Error submitting request to backend: ' + error.message)
  }
}
