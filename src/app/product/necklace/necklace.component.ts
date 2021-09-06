import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-necklace',
  templateUrl: './necklace.component.html',
  styleUrls: ['./necklace.component.css']
})
export class NecklaceComponent implements OnInit {

  products:any;
  totalNumber:number;
  page:number=1;

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    //get request

    this.http.get('http://localhost:3000/necklace').subscribe((data) => {
      // this.http.get('https://fakestoreapi.com/products?limit=5').subscribe((data) => {
        //data storing for use in html component
        this.products = data;
        // var lengthobj = Object.keys(data).length;
        // this.totalNumber=lengthobj;
        this.totalNumber= this.products.length;
        
        // console.log(this.totalNumber)
      }, error => console.error(error));
  }

  nav(id,getval){
    this.router.navigate(['/product'], { queryParams: { cat: getval,id } });
  }

}
