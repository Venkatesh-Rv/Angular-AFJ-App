import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Message } from 'primeng/api';
import { ConfirmedValidator } from '../confirmed.validator'; 
import { PasswordStrengthValidator } from '../password-strength.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-db-update-pwd',
  templateUrl: './db-update-pwd.component.html',
  styleUrls: ['./db-update-pwd.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class DbUpdatePwdComponent implements OnInit {

  updateform : FormGroup;
  msgs: Message[] = [];
  activeIndex1: number = 0;

  constructor(private as:AuthService, private ts:ToastrService, private fb:FormBuilder,
    private route:Router,private confirmationService: ConfirmationService,private messageService: MessageService) 
    { }

  ngOnInit(): void {
    this.updateform = this.fb.group({
      cpassword:[null, Validators.compose([
        Validators.required, Validators.minLength(8),PasswordStrengthValidator])],
      password:[null, Validators.compose([
        Validators.required, Validators.minLength(8)])],
    } ,
    { 
      validator: ConfirmedValidator('cpassword','password')
    }
    );

    // this.verify();
  }

  get f() { return this.updateform.controls; }


  verify(event:any){
    let old = event.target.value; 
    let res = this.as.getUserPayload();
    if(res.password === old){
      this.ts.show("Enter the new password")
      this.activeIndex1 = 1;
    }
    else{
      this.ts.error("Doesn't Match, INVALID")
    }
    console.log(res.password)
  }

  submit() {

    if (this.updateform.invalid) {
      this.ts.error('Enter Proper Inputs..!!')
    }
    else{
     
      let data ={password:this.f.password.value};
      let url = "https://afj-staging-server.herokuapp.com/management/password/update/";
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
            this.ts.success('Password Updated')
            this.as.doLogoutUser();
            // this.as.logout();
            // this.route.navigate(['/login']);
          }
          else if(ele.status === 206){
            
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

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to Reset your Password ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.submit()
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
}



  pwd_update(data) {
    let send;
    for (let key in data) {
      send = data[key];
    }
    this.as.storeTokens(send);
    this.as.owner_data(send);
  }
  
}
