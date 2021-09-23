import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-db-user-profile',
  templateUrl: './db-user-profile.component.html',
  styleUrls: ['./db-user-profile.component.css']
})
export class DbUserProfileComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {

  }

  profile(){
    this.authService.login
  }

}
