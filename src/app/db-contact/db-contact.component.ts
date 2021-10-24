import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-db-contact',
  templateUrl: './db-contact.component.html',
  styleUrls: ['./db-contact.component.css']
})
export class DbContactComponent implements OnInit {

  constructor(private as :AuthService, private ts:ToastrService) { }

  ngOnInit(): void {
    
  }
  contact(){
    this.ts.success("Your Response have been submitted")
  }

}
