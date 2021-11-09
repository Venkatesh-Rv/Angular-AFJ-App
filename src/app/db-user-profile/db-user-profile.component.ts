import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
// import {DialogService} from 'primeng/dynamicdialog';
// import {DynamicDialogRef} from 'primeng/dynamicdialog';

import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from '../confirmed.validator'; 
import { PasswordStrengthValidator } from '../password-strength.validators';


@Component({
  selector: 'app-db-user-profile',
  templateUrl: './db-user-profile.component.html',
  styleUrls: ['./db-user-profile.component.css'],
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`],
providers: [ConfirmationService,MessageService]
})

export class DbUserProfileComponent implements OnInit {
 
  obj_data;
  msgs: Message[] = [];
  // ref: DynamicDialogRef;
  displayResponsive: boolean;
  public showPassword: boolean;
  updateform : FormGroup;
 

  constructor(private authService:AuthService,private ts:ToastrService,private fb:FormBuilder,
     private confirmationService: ConfirmationService,private messageService: MessageService, 
     private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.profile();
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
  }

  get f() { return this.updateform.controls; }

  profile() {
    this.obj_data = this.authService.get_details();
    console.log(this.obj_data);
    console.log(this.obj_data.last_name, this.obj_data.email_id)
  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to reset your Password ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.ts.info("Your Password Reset Request is sent to your mail.")
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
}


// if (this.updateform.invalid) {
//   this.ts.error('Enter Proper Inputs..!!')
// }

showResponsiveDialog() {
  this.displayResponsive = true;
}

  pwd_update(data) {
    let send;
    for (let key in data) {
      send = data[key];
    }
    this.authService.storeTokens(send);
    this.authService.owner_data(send);
  }

}
