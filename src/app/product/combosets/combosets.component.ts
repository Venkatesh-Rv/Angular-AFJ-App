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
  totalNumber:number;
  page:number=1;
  pageOfItems;
  itemss: any[];
  items;

  home: any;
  filter;
  orderHeader;
  isDesc;
  visibleSidebar1;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.itemss = [{ label: 'Combo-sets' }];

    this.home = { icon: 'pi pi-home' };
    this.filter = { icon: 'pi pi-filter' };
        //get request

        this.http.get('http://localhost:3000/combo-sets').subscribe((data) => {
        // this.http.get('https://fakestoreapi.com/products?limit=5').subscribe((data) => {
          //data storing for use in html component
          this.products = data;
          // var lengthobj = Object.keys(data).length;
          // this.totalNumber=lengthobj;
          this.totalNumber= this.products.length;
          
          // console.log(this.totalNumber)
        }, error => console.error(error));
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

sort(header:string){
  this.orderHeader = header;
}

}
