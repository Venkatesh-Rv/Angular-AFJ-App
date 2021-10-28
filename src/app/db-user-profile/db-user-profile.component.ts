import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmEventType} from 'primeng/api/confirmaeventtype';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

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
  admin_profile;
  email;
  ph_no;
  last_name;
  address;
  picture;

  constructor(private authService:AuthService,private ts:ToastrService,
     private confirmationService: ConfirmationService,private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.profile();

  }

  profile(){
    
    
    this.obj_data = this.authService.get_details();
    console.log(this.obj_data);
    console.log(this.obj_data.last_name,this.obj_data.email_id)

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

}
