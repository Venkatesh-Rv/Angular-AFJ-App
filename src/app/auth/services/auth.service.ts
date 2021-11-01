import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { of, Observable } from 'rxjs';
import { catchError, mapTo,map, tap } from 'rxjs/operators';
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
  public last_name:string;
  public address:string;
  public picture:string;
  send; //login data
  ans; //token data after refresh

  constructor(private http: HttpClient,private ts:ToastrService, private router: Router) {}

  sample(){
    return true;
  }

  register(url,getData){
    return this.http.post(url, getData, {observe: 'response'})
  }

  email_link(url) {
    return this.http.get(url,{ observe: 'response'})
  }

  forgot_pwd(url){
    return this.http.get(url,{observe:'response'})
  }

  otp(url,data){
    return this.http.post(url,data,{observe:'response'})
  }

  reset_pwd(url,data){
    return this.http.put(url,data,{observe:'response'})
  }

  update_adminprofile(url,getData){
    return this.http.put(url, getData, {observe: 'response'})
  }

  login(user: { username: string, password: string }): Observable<boolean> {
    //console.log(user)
    return this.http.post<any>(`${config.apiUrl}management/login/`, user)
      .pipe(
        tap(tokens => {
          console.log(user)
          
          for (let key in tokens) {
            this.send = tokens[key];
            if(this.send === null){
              this.ts.error("Please enter your email correctly")
              
            }
            console.log(this.send);
        
    }
      if(this.send === 'sign in password is invalid'){
        this.ts.error(this.send)
        
        return of (false)
      }
          console.log(tokens)
          
          this.doLoginUser(user.username, this.send)
          this.ts.success("Logged In.")
        }),
        mapTo(true),
        catchError(error => {
          //this.send = error
          this.ts.error(error.error.message)
          console.log(error.error.message)
          //alert(error);
          this.removeTokens();
          this.removeProfile();
          
          return of(false);
        }));
  }

  // logout() {
  //   return this.http.get<any>(`${config.apiUrl}management/user/logout/`).pipe(
  //     tap(() =>{ 
  //       this.doLogoutUser()
        
  //     }),
  //     mapTo(true),
  //     catchError(error => {
  //       alert(error.error);
        
  //       return of(false);
  //     }));
  // }

  // logout() {
  //   this.doLogoutUser();
  //   // this.router.navigate(["/login"])
  //   //return this.http.get<any>(`${config.apiUrl}management/user/logout/`);
  //   // return this.http.get<any>(`${config.apiUrl}management/user/logout/`)
  //   //   .pipe(map((res: any) => {
  //   //     this.ts.success('out..')
  //   //     return res;
  //   //   }))
  // }

  logout(){
    this.http.get<any>('https://afj-staging-server.herokuapp.com/user/logout/').subscribe(data => {
            this.ts.success(data.message)
            console.log(data.message)
            this.doLogoutUser();
        }) 
  }


  getUserPayload(){
    var token = localStorage.getItem(this.ACCESS_TOKEN);
    if(token){
      var userPayload = atob(token.split('.')[1])
      return JSON.parse(userPayload);
    }
    else{
      return null;
    }
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    console.log(userPayload)

    if(userPayload){
      let bool=userPayload.exp > Date.now() /1000
      console.log(bool, typeof(bool))
      if(!bool){
        console.log(bool)
        var data = {
          "refresh_token":localStorage.getItem('refresh_token')
        }
        var url= 'https://afj-staging-server.herokuapp.com/refresh/token/';
        // this.refreshTokent();
        this.refreshTokent(url,data).subscribe(ele =>{
          console.log(ele)
        })
        return true;
      }
      return bool
      
    }
    else{
      //this.ts.warning('')
      return false
    }

    
    //return !!this.getJwtToken();
  }

  expire(){

  }

  refreshToken() {
    console.log('called')
    return this.http.post<any>(`${config.apiUrl}refresh​/token​/`, {
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

  refreshTokent(url,data){
    console.log('in')
    return this.http.post(url,data);
  }

  hs(){
    return this.http.get('https://afj-staging-server.herokuapp.com/index/head_start/')
  }

  getJwtToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  getProfile(){
   this.loggedUser = sessionStorage.getItem('first_name'); 
   this.last_name = sessionStorage.getItem('last_name'); 
   this.email = sessionStorage.getItem('email_id'); 
   this.ph_no = sessionStorage.getItem('phone_number'); 
   this.address = sessionStorage.getItem('address');
   this.picture = sessionStorage.getItem('profile_url')
  }

  private doLoginUser(username: string, tokens: any) {
    console.log(tokens)
    this.storeTokens(tokens);
    this.storeProfile(tokens);
    this.owner_data(tokens)
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
    this.removeProfile();
    //this.ts.success('Logout Successfully')
    this.router.navigate(['/login'])
  }

  private getRefreshToken() {
    console.log('got')
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

  //store profile data in storage

  owner_data(data){
    localStorage.setItem('details',JSON.stringify(data))
  }

  get_details(){
    return JSON.parse( localStorage.getItem('details'))
  }

  private storeProfile(data){
    sessionStorage.setItem('first_name', data.first_name); 
    sessionStorage.setItem('last_name', data.last_name); 
    sessionStorage.setItem('email_id', data.email_id); 
    sessionStorage.setItem('phone_number', data.phone_number); 
    sessionStorage.setItem('address', data.address.city);
    sessionStorage.setItem('profile_url', data.profile_url);

    console.log(sessionStorage.getItem('profile_pic'))
    
    this.loggedUser = sessionStorage.getItem('first_name'); 
    
  }

  private removeProfile(){
    sessionStorage.removeItem('first_name'); 
    sessionStorage.removeItem('last_name'); 
    sessionStorage.removeItem('email_id'); 
    sessionStorage.removeItem('phone_number'); 
    sessionStorage.removeItem('address');
    sessionStorage.removeItem('profile_url');   
    
  }


  private removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem('details');
  }
}
