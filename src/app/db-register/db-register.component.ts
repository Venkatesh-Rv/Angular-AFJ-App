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
  }

  


  signup(){

   console.log(this.register.value)
   console.log(this.register.value.address)
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

}
