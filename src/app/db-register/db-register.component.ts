import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PwdValidator } from '../pwd-validator';

@Component({
  selector: 'app-db-register',
  templateUrl: './db-register.component.html',
  styleUrls: ['./db-register.component.css']
})
export class DbRegisterComponent implements OnInit {

  public register:FormGroup;
  

  constructor(private fb:FormBuilder, private http:HttpClient,private router:Router,private ts:ToastrService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      first_name:[''],
      lastname:null,
      email:[''],
      password:[''],
      phone_number:[''],
      address:[''],
      profile_pic:null
    }
    );

    ///test
    this.http.get<any>("https://afj-staging-server.herokuapp.com/management/head_start/").subscribe(res=>{
      console.log(res)
    })
    
  }

  signup_d(){
  //  console.log(this.register.value)
  //  console.log(this.register.value.address)
   //let ggs = this.register.value["address"] = {'address':this.register.value.address};
   console.log(JSON.stringify(this.register.value["address"] = {'address':this.register.value.address}));
   
    this.http.post<any>("http://localhost:3000/register",this.register.value).subscribe(
      res=>{
        this.ts.success('Account created Successfully')
        this.register.reset();
        this.router.navigate(['/login'])
      }
    ),error => {
     
      this.ts.warning('Error please try again')
      this.register.reset();
      // window.location.href = 'URL';
      }

    

  }

  signup(){
   let ggs = JSON.stringify(this.register.value["address"] = {"address":this.register.value.address});
   console.log(this.register.value);
   
  //  this.http.post<any>("https://afj-staging-server.herokuapp.com/management/create/owner/",this.register.value, 
  //  {
  //    headers: {"Content-Type": "application/json","Accept": "application/json"}
  //   }).subscribe(
  //    res=>{
  //      this.ts.success('Account created Successfully')
  //      this.register.reset();
  //      this.router.navigate(['/login'])
  //    }
  //  ),error => {
    
  //    this.ts.error('Error please try again')
  //    this.register.reset();
  //    // window.location.href = 'URL';
  //    }
   }

}
