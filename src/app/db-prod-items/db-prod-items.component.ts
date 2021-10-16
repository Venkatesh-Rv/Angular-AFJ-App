import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-db-prod-items',
  templateUrl: './db-prod-items.component.html',
  styleUrls: ['./db-prod-items.component.css']
})
export class DbProdItemsComponent implements OnInit {
  message;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    // this.http.get<any>("https://afj-staging-server.herokuapp.com/head_start/").subscribe(res=>{
    //   console.log(res)
    //   this.message = res
    // })
  }

}
