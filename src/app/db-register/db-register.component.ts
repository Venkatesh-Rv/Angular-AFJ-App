import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
      name:[''],
      email:[''],
      pwd:['']
    })
  }

  signup(){
    this.http.post<any>("http://localhost:3000/register",this.register.value).subscribe(
      res=>{
        this.ts.success('Account created Successfully')
        this.register.reset();
        this.router.navigate(['/login'])
      }
    )

  }

}
