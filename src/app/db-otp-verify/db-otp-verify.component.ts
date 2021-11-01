import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-db-otp-verify',
  templateUrl: './db-otp-verify.component.html',
  styleUrls: ['./db-otp-verify.component.css']
})
export class DbOtpVerifyComponent implements OnInit {

  otp_form:FormGroup;
  loaderbool: boolean = false;

  constructor(private route: Router,private ts: ToastrService,private fb:FormBuilder,
    private as:AuthService) { }

  ngOnInit(): void {
    this.otp_form = this.fb.group({
      otp:[""],
     
    }
    );
  }

  get f() { return this.otp_form.controls; }

  d(){
    let data = this.f.otp.value;
    var email = localStorage.getItem('email_reset');
    let url = "https://afj-staging-server.herokuapp.com/management/otp/validation/?email_id="+email;
    this.as.otp(url,data).subscribe(
      ele=>{
        if (ele.status === 200) {
          // this.loaderbool = false;
          console.log(ele.body)
          for (let key in ele.body) {
            console.log(ele.body[key])
            var pc = ele.body[key]
          }
          this.ts.success(pc)
          
          this.route.navigate(['/admin/reset-pwd']);
        }
        else if(ele.status === 400){
          
          for (let key in ele.body) {
            console.log(ele.body[key])
            var per = ele.body[key]
          }
          console.log(per)
          this.ts.error(per)
        }
      },
      error =>{
        console.log(error.statusText)
        this.ts.error(error.statusText)
      }
      
    )
  }

  resend(){
    this.loaderbool = true;
    this.as.forgot_pwd("https://afj-staging-server.herokuapp.com/management/password/reset/request/?email_id="+localStorage.getItem('email_reset')).subscribe(
      res =>{
        if (res.status === 200) {
          for (let key in res.body) {
            console.log(res.body[key])
            var pc = res.body[key]
          }
          this.loaderbool = false;
          this.ts.success(pc);
        }
      },
      error =>{
        this.loaderbool =false;
        this.ts.error("Error,Click again")
      }
    )
  }
}
