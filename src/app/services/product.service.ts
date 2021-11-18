import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
// import {ProductModelServer, serverResponse} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.serverURL;


  constructor(private http: HttpClient) {
  }

  getAllProducts():Observable<any> {
    console.log('service works....');
    return this.http.get(this.url + 'necklace/');
    
  }

 
  // getAllProducts(limitOfResults=10): Observable<serverResponse> {
  //   return this.http.get<serverResponse>(this.url + 'products', {
  //     params: {
  //       limit: limitOfResults.toString()
  //     }
  //   });
  // }

  getSingleProduct(id: Number,cat:string): Observable<any> {
    return this.http.get<any>(this.url + cat+'/'+ id);
  }

  get(params:any):Observable<any>{
    let urrl ='http://localhost:3000/necklace?_page=1&_limit='
    return this.http.get(urrl + params)
  }


  // getSingleProduct(id: Number): Observable<ProductModelServer> {
  //   return this.http.get<ProductModelServer>(this.url + 'products/' + id);
  // }

  getProductsFromCategory(catName: String): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'products/category/' + catName);
  }

  // getProductsFromCategory(catName: String): Observable<ProductModelServer[]> {
  //   return this.http.get<ProductModelServer[]>(this.url + 'products/category/' + catName);
  // }

}
