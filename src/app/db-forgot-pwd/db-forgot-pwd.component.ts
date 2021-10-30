import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-db-forgot-pwd',
  templateUrl: './db-forgot-pwd.component.html',
  styleUrls: ['./db-forgot-pwd.component.css']
})
export class DbForgotPwdComponent implements OnInit {

  co_email;
  public email_form:FormGroup;
  OTP;
  forgot: boolean = true;
  verify: boolean = false;//otp
  loaderbool: boolean = false;

  constructor(private route: Router, private cs: CartService, private ts: ToastrService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.email_form = this.fb.group({
      email:[""],
     
    }
    );
  }

  get f() { return this.email_form.controls; }

  //forgot
  email_verify() {
    this.loaderbool = true;
    console.log(this.f.email.value);
    this.cs.email_verify("https://fakestoreapi.com/products", this.f.email.value).subscribe(ele => {
      this.ts.success("Please check mail for the verification",this.f.email.value)
      // this.verify = true;
      this.loaderbool = false;
      this.email_form.reset();
      // this.forgot = false;
     
      
      // this.route.navigate(['/details'])

    }, error => {
      this.forgot = true;
      this.ts.warning('Error')
    })
  }

  //otp
  check() {
    this.loaderbool = true;
    this.cs.email_verify("https://fakestoreapi.com/products", this.OTP).subscribe(ele => {
      console.log(this.OTP);
      this.ts.success('mail verified successfully')
     
      // console.log(this.forgot)
      // console.log(this.cs.items, this.cs.checkout)
      this.route.navigate(['/reset-pwd'])

    }, error => {
      
      this.ts.warning('Error')
    })
  }

  page(){
    this.route.navigate(['/'])
    this.ts.success('Thanks for purchasing...');
  }

  mail(event: any) {
    this.co_email = event.target.value;
    console.log(this.co_email);
    
  }

  d(){
    this.ts.success("The Verification link is sent to "+this.co_email +" "+"respectively");
    this.route.navigate(['/login'])
  }

  otp(event: any) {
    this.OTP = event.target.value;
    //console.log(this.co_email);
  }

}
