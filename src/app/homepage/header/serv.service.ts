import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, skipWhile, tap} from 'rxjs/operators'
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServService {
  private subject = new BehaviorSubject<string>('burger');

  constructor(private http : HttpClient) { }

  getData(){
    return this.http.get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((response:[]) => response.map(item => item['name']))
      )
  }

  sendMessage(message: any) {
    this.subject.next(message);
  }

  receivedMessage(): Observable<any> {
    return this.subject.asObservable();
  }


}