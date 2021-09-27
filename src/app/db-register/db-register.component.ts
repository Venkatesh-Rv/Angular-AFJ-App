import { HttpClient ,HttpHeaders} from '@angular/common/http';
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
      first_name:[""],
      last_name:'null',
      email_id:[""],
      phone_number:[""],
      address:[""],
      password:[""],
      profile_pic:'null'
    }
    );

    ///test
    this.http.get<any>("https://afj-staging-server.herokuapp.com/management/head_start/").subscribe(res=>{
      console.log(res)
    })
    
  }

  get f() { return this.register.controls; }

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
   const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
   
   this.http.post<any>("https://afj-staging-server.herokuapp.com/management/create/owner/",
   this.register.value,httpOptions
  //  {
  //   first_name: this.f.first_name.value,
  //   last_name: this.f.last_name.value,
  //   email_id: this.f.email_id.value,
  //   phone_number: this.f.phone_number.value,
  //   address: this.f.address.value,
  //   password: this.f.password.value,
  //   profile_pic: this.f.profile_pic.value
  //  }
   ).subscribe(
     res=>{
       this.ts.success('Account created Successfully')
       this.register.reset();
       this.router.navigate(['/login'])
     }
   ),error => {
    
     this.ts.error('Error please try again')
     this.register.reset();
     // window.location.href = 'URL';
     }
   }

}
