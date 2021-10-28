import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';


@Component({
  selector: 'app-db-login',
  templateUrl: './db-login.component.html',
  styleUrls: ['./db-login.component.css']
})
export class DbLoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private http:HttpClient,private router:Router,private ts:ToastrService,
    private authService:AuthService) { }

  public login:FormGroup;
  displayModal:boolean;
  displayBasic: boolean;
  loaderbool: boolean = false;

  ngOnInit(): void {
    this.login = this.fb.group({
      username:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })
  }

  get f() { return this.login.controls; }

  auth_d(){
    this.http.get<any>("http://localhost:3000/register").subscribe(
      res=>{
        const user = res.find((a:any)=>{
          return a.name === this.login.value.name && a.password === this.login.value.password
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

  auth(){
    this.loaderbool = true
    this.authService.login(
      {
        username: this.f.username.value,
        password: this.f.password.value
      }
    )
    .subscribe(success => {
      if (success) {
        this.loaderbool = false
        //this.login.reset();
        this.router.navigate(['/ban-upload']);
      }
      else{
        this.loaderbool = false
        console.log("client")
        //this.ts.error('User Not Found')
        this.login.reset();
      }
    });

  }

  showModalDialog() {
    this.displayModal = true;
}

showBasicDialog() {
  this.displayBasic = true;
}


}
