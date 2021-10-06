import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-db-user-profile',
  templateUrl: './db-user-profile.component.html',
  styleUrls: ['./db-user-profile.component.css']
})
export class DbUserProfileComponent implements OnInit {
 
 obj_data;
  admin_profile;
  email;
  ph_no;
  last_name;
  address;
  picture;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.profile();

  }

  profile(){
    
    
    this.obj_data = this.authService.get_details();
    console.log(this.obj_data);
    console.log(this.obj_data.last_name,this.obj_data.email_id)

  }

}
