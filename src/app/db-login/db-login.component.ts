import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-db-login',
  templateUrl: './db-login.component.html',
  styleUrls: ['./db-login.component.css']
})
export class DbLoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private http:HttpClient,private router:Router,private ts:ToastrService) { }

  public login:FormGroup;

  ngOnInit(): void {
    this.login = this.fb.group({
      email:[''],
      pwd:['']
    })
  }

  auth(){
    this.http.get<any>("http://localhost:3000/register").subscribe(
      res=>{
        const user = res.find((a:any)=>{
          return a.email === this.login.value.email && a.pwd === this.login.value.pwd
        });
        if(user){
          this.ts.success('login success')
          this.login.reset();
          this.router.navigate(['/ban-upload'])

        }else{
          this.ts.warning("User not found")
          this.login.reset();
        }
       
      }
    )

  }

}
