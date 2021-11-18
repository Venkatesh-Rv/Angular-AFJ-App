import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-necklace',
  templateUrl: './necklace.component.html',
  styleUrls: ['./necklace.component.css']
})
export class NecklaceComponent implements OnInit {

  products:any;
  totalNumber:number;
  page:number=1;
  itemss = [];
  pageOfItems: Array<any>;
  ProdData: any[] = [];

  cities: any[];

  selectedCity1: any;

  data;

  items: any[];

  home: any;
  filter;
  orderHeader;
  isDesc;
  visibleSidebar1;

  allpost;
  notEmptyPost = true;
  notscrolly = true;

  constructor(private http:HttpClient, private router:Router, private ps:ProductService) { }

  ngOnInit(): void {

    this.cities = [
      {name: 'Name', value: 'Name'},
      {name: 'Show Low to High Price', value: 'Low'},
      {name: 'Show High to Low Price', value: 'High'}
  ];

   
    this.itemss = [{ label: 'Necklace' }];

    this.home = { icon: 'pi pi-home' };
    this.filter = { icon: 'pi pi-filter' };
    //get request

    this.http.get('http://localhost:3000/necklace').subscribe((data) => {
      // this.http.get('https://fakestoreapi.com/products?limit=5').subscribe((data) => {
        //data storing for use in html component
        this.products = data;
        console.log(this.products)
        this.items = this.products
        this.ProdData = this.products
        // this.ProdData = [
        //   {
        //     "Name": "Apples",
        //     "Price": "2.0"
        //   },
        //   {
        //     "Name": "Bananas",
        //     "Price": "1.0"
        //   },
        //   {
        //     "Name": "Cherries",
        //     "Price": "3.0"
        //   },
        //   {
        //     "Name": "Elderberry",
        //     "Price": "4.0"
        //   },
        //   {
        //     "Name": "Lime",
        //     "Price": "1.0"
        //   },
        //   {
        //     "Name": "Mango",
        //     "Price": "6.0"
        //   },
        //   {
        //     "Name": "Yellow Passion Fruit",
        //     "Price": "5.0"
        //   }
        // ]
        console.log(this.ProdData);
        // var lengthobj = Object.keys(data).length;
        // this.totalNumber=lengthobj;
        this.totalNumber= this.products.length;
        
        // console.log(this.totalNumber)
      }, error => console.error(error));

      // this.loadInitPost();
      this.get();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.ProdData = pageOfItems;
}

  // load the Initial 6 posts
 loadInitPost() {
  const url = 'http://localhost:3000/necklace';
  this.http.get(url).subscribe(data => {
    console.log(data);
    this.allpost = data;
  });
}

// onScroll() {
// if (this.notscrolly && this.notEmptyPost) {
//   // this.spinner.show();
//   this.notscrolly = false;
//   this.loadNextPost();
//  }
// }
// load th next 6 posts

loadNextPost() {
  const url = 'http://localhost:3000/necklace?_page=1&_limit=10';
  // return last post from the array
  const lastPost = this.allpost[this.allpost.length - 1];
  // get id of last post
  const lastPostId = lastPost.id;
  // sent this id as key value pare using formdata()
  const dataToSend = new FormData();
  dataToSend.append('id', lastPostId);
  console.log(dataToSend)
  console.log(lastPostId)
  // call http request
  this.http.get(url)
  .subscribe( (data: any) => {
     const newPost = data;
    //  this.spinner.hide();
     if (newPost.length === 0 ) {
       this.notEmptyPost =  false;
     }
     // add newly fetched posts to the existing post
     this.allpost =[]
     this.allpost = this.allpost.concat(newPost)
     this.notscrolly = true;
   });
}

get(){
  this.ps.get(this.page).subscribe(res=>{
    this.data = res
    this.allpost = this.data
  })
}

// onScroll(){
  
//   setTimeout(()=>{ 
//     this.page += 1;                         
//     this.get();
// }, 4000);
 
// }

// sort(header:string){
//   this.orderHeader = header;
// }

q(dd){
  this.sort(dd)
}

sort(e) {
  console.log(e)

  switch (e) {
    case "Low":
      {
        this.ProdData = this.ProdData.sort((low, high) => low.price - high.price);
        break;
      }

    case "High":
      {
        this.ProdData = this.ProdData.sort((low, high) => high.price - low.price);
        break;
      }

      case null:
        {
          this.ProdData;
          break;
        }

    case "Name":
      {
        this.ProdData = this.ProdData.sort(function (low, high) {
          if (low.name < high.name) {
            return -1;
          }
          else if (low.name > high.name) {
            return 1;
          }
          else {
            return 0;
          }
        })
        break;
      }

    default: {
      this.ProdData = this.ProdData.sort((low, high) => low.price - high.price);
      break;
    }

  }
  return this.ProdData;

}

  ascend() {
    const value = ['a', 'd', 'b', 'c']
    console.log(value.sort((a, b) => a < b ? -1 : a > b ? 1 : 0))	// Ascending
    
  }

  descend() {
    const value = ['d', 'a', 'c', 'b']
    console.log(value.sort((a, b) => a < b ? 1 : a > b ? -1 : 0))	// descending
    
  }

  nav(id,getval){
    this.router.navigate(['/product'], { queryParams: { cat: getval,id } });
  }

}
