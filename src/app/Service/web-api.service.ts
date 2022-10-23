import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private httpClient: HttpClient) { }
  headers : HttpHeaders = new HttpHeaders({
    'Content-Type':  'application/json',
    'user':  'User123',
    'password':  'Password123'
  });

  get(url: string): Observable<any> {
    const httpOptions = {
      headers: this.headers,
      observe: "response" as 'body'
    };
    return this.httpClient.get(
      url,
      httpOptions
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  delete(url: string): Observable<any> {
    const httpOptions = {
      headers: this.headers,
      observe: "response" as 'body'
    };
    return this.httpClient.delete(
      url,
      httpOptions
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  post(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: this.headers, 
     observe: "response" as 'body'
    };
    
    return this.httpClient.post(url,
      JSON.stringify(model),
      httpOptions)
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  put(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: this.headers, 
     observe: "response" as 'body'
    };
    //  console.log(JSON.stringify(model));
    
    return this.httpClient.put(url,
      JSON.stringify(model),
      httpOptions)

      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }
  private ReturnResponseData(response: any) {
    return response;
  }
  private handleError(error: any) {
    return throwError(error);
  }
  
}
