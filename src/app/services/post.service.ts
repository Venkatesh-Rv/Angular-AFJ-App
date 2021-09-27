import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  url: string = ''; /*TO BE CHANGED TO ENV VAR */

  //
  link: string = '';

//banner datas
  postData(url, getData) {

    return this.http.post(url, getData)

  }

  updateData(url, getData) {

    return this.http.put(url, getData)

  }

  deleteData(url,datas) {
    return this.http.put(url, datas)
  }

  getData(){
    return this.http.get<any>("http://ec2-13-232-92-217.ap-south-1.compute.amazonaws.com/product/banner/get/all/record/")
      .pipe(map((res: any) => {
        return res;
      }))

    // return this.http.get<any>("http://ec2-13-232-92-217.ap-south-1.compute.amazonaws.com/product/banner/get/all/record/")
      
  }

  //for image retrieval
  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  //product datas 

  postProduct(data: any) {
    return this.http.post<any>("http://ec2-13-232-92-217.ap-south-1.compute.amazonaws.com/product/create/", data)
      // return this.http.post<any>("http://localhost:4000/posts/",data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getProduct() {
    return this.http.get<any>("http://localhost:4000/posts")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateProduct(data: any, id: number) {
    return this.http.put<any>("http://localhost:4000/posts/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteProduct(id: number) {
    return this.http.delete<any>("http://localhost:4000/posts/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }


}
