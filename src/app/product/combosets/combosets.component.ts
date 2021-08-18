import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-combosets',
  templateUrl: './combosets.component.html',
  styleUrls: ['./combosets.component.css']
})
export class CombosetsComponent implements OnInit {
  products:any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
        //get request
        this.http.get('http://localhost:3000/combo-sets').subscribe(data => {
          //data storing for use in html component
          this.products = data;
        }, error => console.error(error));
  }

}
