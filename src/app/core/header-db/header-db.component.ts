import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header-db',
  templateUrl: './header-db.component.html',
  styleUrls: ['./header-db.component.css']
})
export class HeaderDbComponent implements OnInit {

  name;
  constructor(private as:AuthService) { 

   this.name= this.as.loggedUser
  }

  ngOnInit(): void {
    this.as.getProfile();
  }

  logout(){
    this.as.logout()
    
  }

}
