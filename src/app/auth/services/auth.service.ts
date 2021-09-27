import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from './../../config';
import { Tokens } from '../models/tokens';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN = 'access_token';
  private readonly REFRESH_TOKEN = 'refresh_token';
  public loggedUser: string;
  public email:string;
  public ph_no:string;
  send; //login data
  ans; //token data after refresh

  constructor(private http: HttpClient,private ts:ToastrService, private router: Router) {}

  sample(){
    return true;
  }

  register(){

  }

  login(user: { user_name: string, password: string }): Observable<boolean> {
    console.log(user)
    return this.http.post<any>(`${config.apiUrl}management/user/signin/`, user)
      .pipe(
        tap(tokens => {
          console.log(user)
          
          for (let key in tokens) {
            this.send = tokens[key];
            console.log(this.send);
        
    }
          console.log(tokens)
          
          this.doLoginUser(user.user_name, this.send)
          this.loggedUser= this.send.first_name
          this.email= this.send.email_id
          this.ph_no= this.send.phone_number

          console.log(this.loggedUser,this.email,this.ph_no)

          this.ts.success("Logged In.")
        }),
        mapTo(true),
        catchError(error => {
          //this.ts.error('User Not found')
          // console.log(error.error)
          alert(error.error);
          return of(false);
        }));
  }

  // logout() {
  //   return this.http.get<any>(`${config.apiUrl}management/user/logout/`, {
  //     // 'refresh_token': this.getRefreshToken()
  //   }).pipe(
  //     tap(() =>{ this.doLogoutUser()}),
  //     mapTo(true),
  //     catchError(error => {
  //       alert(error.error);
        
  //       return of(false);
  //     }));
  // }

  logout() {
    this.doLogoutUser()
    this.router.navigate(["/login"])
    this.ts.success("Logged Out Successfully")
    this.http.get<any>(`${config.apiUrl}management/user/logout/`);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${config.apiUrl}management/refresh/token/`, {
      'refresh_token': this.getRefreshToken()
    }).pipe(tap((tokens) => {
      console.log("rt works"+ tokens)

      for (let key in tokens) {
        this.ans = tokens[key];
        console.log(this.ans);   
}
      this.storeJwtToken(this.ans.access_token);
      this.storeRefreshToken(this.ans.refresh_token)
      console.log('new tokens refreshed')
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  getProfile(){
   this.loggedUser= sessionStorage.getItem('first_name'); 
    sessionStorage.getItem('last_name'); 
   this.email = sessionStorage.getItem('email_id'); 
   this.ph_no = sessionStorage.getItem('phone_number'); 
    sessionStorage.getItem('address'); 
  }

  private doLoginUser(username: string, tokens: any) {
    console.log(tokens)
    this.loggedUser = username;
    this.storeTokens(tokens);
    this.storeProfile(tokens)
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.ACCESS_TOKEN, jwt);
  }

  private storeRefreshToken(jwt: string) {
    localStorage.setItem(this.REFRESH_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    console.log('entered')
   
    console.log(tokens)
    localStorage.setItem(this.ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  private storeProfile(data:any){
    sessionStorage.setItem('first_name', data.first_name); 
    sessionStorage.setItem('last_name', data.last_name); 
    sessionStorage.setItem('email_id', data.email_id); 
    sessionStorage.setItem('phone_number', data.phone_number); 
    sessionStorage.setItem('address', data.address.address); 
    
  }

 

  private removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
