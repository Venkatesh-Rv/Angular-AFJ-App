import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  fetchPosts(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts?userId=${id}`).pipe(
      catchError(err => of([]))
    );
  }

  results(url,cat):Observable<any>{
    // return this.http.get<any>(url + cat);
    return cat
  }

}
