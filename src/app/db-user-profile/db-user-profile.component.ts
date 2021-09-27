import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-db-user-profile',
  templateUrl: './db-user-profile.component.html',
  styleUrls: ['./db-user-profile.component.css']
})
export class DbUserProfileComponent implements OnInit {
  admin_profile;
  email;
  ph_no;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.profile();

  }

  profile(){
    this.authService.getProfile();
    this.admin_profile = this.authService.loggedUser;
    this.email = this.authService.email;
    this.ph_no = this.authService.ph_no;

   

  }

}
