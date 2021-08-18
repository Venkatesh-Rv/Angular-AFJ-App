import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomepagesectionService {

  constructor(private http:HttpClient) { }


  url: string = 'http://ec2-13-232-92-217.ap-south-1.compute.amazonaws.com/'

  url_dummy: string = 'http://localhost:3000/'


  getHomeBanner(endpoint) {
    return this.http.get(`${this.url}${endpoint}`)

  }

  homeSection(endpoint){
    return this.http.get(`${this.url_dummy}${endpoint}`)
  }
}
