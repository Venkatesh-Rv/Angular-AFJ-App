import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';


@Component({
  selector: 'app-db-reset-pwd',
  templateUrl: './db-reset-pwd.component.html',
  styleUrls: ['./db-reset-pwd.component.css']
})
export class DbResetPwdComponent implements OnInit {

  Pwdform : FormGroup;

  constructor(private fb:FormBuilder, private ts:ToastrService, private as:AuthService,
    private route:Router) { }

  ngOnInit(): void {

    this.Pwdform = this.fb.group({
      passwordc:["",Validators.required,Validators.minLength(8)],
      password:["",Validators.required,Validators.minLength(8)],
    });
      
  }

  get f() { return this.Pwdform.controls; }

  checkPasswords() {
    const pass = this.f.passwordc.value;
    const confirmPass = this.f.password.value;

    return pass === confirmPass ? null : true;
}


  submit() {

    // if (this.checkPasswords === true){

    // }
    
    let mail = localStorage.getItem('email_reset');
    let data =this.f.password.value;
    let url = "https://afj-staging-server.herokuapp.com/management/password/reset/?email_id="+mail;
    this.as.reset_pwd(url, data).subscribe(
      ele=>{
        // this.route.navigate[("/login")]
        if (ele.status === 200) {
          // this.loaderbool = false;
          console.log(ele.body)
          for (let key in ele.body) {
            console.log(ele.body[key])
            var pc = ele.body[key]
          }
          this.ts.success(pc)
          localStorage.removeItem('email_reset')
          this.route.navigate(['/login']);
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

}
