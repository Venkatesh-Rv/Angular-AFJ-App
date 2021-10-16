import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-db-contact',
  templateUrl: './db-contact.component.html',
  styleUrls: ['./db-contact.component.css']
})
export class DbContactComponent implements OnInit {

  constructor(private as :AuthService) { }

  ngOnInit(): void {
    
  }

}
