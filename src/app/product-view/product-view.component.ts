import { Component, OnInit,
  QueryList,
  ViewChildren,
  ElementRef, 
  Input
} from '@angular/core';
import { CurrencyPipe } from "@angular/common";
import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { map } from "rxjs/operators";
import { ProductService } from '../services/product.service'; 
import { CartService } from '../services/cart.service';

// interface Food {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})

export class ProductViewComponent implements OnInit {
  id: Number;
  cat;
  product;
  message='hello'

  items = [];
  sampleSuggestionsArray = [
    {
      id: "1",
      menuName: "Item 1",
      variationCost: "20.50",
      desc: "Lorem ipsum dolor sit amet..",
      qtyTotal: 0
    },
    {
      id: "2",
      menuName: "Item 2",
      variationCost: "10",
      desc: "Lorem ipsum dolor sit amet..",
      qtyTotal: 0
    },
    {
      id: "3",
      menuName: "Item 3",
      variationCost: "5.50",
      desc: "Lorem ipsum dolor sit amet..",
      qtyTotal: 0
    }
  ];


  // @ViewChildren('myitems') subTotalItems: QueryList<ElementRef>;
  @ViewChildren("subTotalWrap") subTotalItems: QueryList<ElementRef>;
  @ViewChildren("subTotalWrap_existing") subTotalItems_existing: QueryList<ElementRef>;

  constructor(private aroute:ActivatedRoute, 
    private productService:ProductService,
    private cartService :CartService,
    private router: Router,
    private currencyPipe: CurrencyPipe ){
    }
  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];

  ngOnInit(): void {

    this.aroute.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      
      this.productService.getSingleProduct(this.id).subscribe(prod => {
        this.product = prod;
        // if (prod.image_url !== null) {
        //   this.thumbimages = prod.image_url.split(';');
        // }

      });
    });

    //For cart
    this.cartService.loadCart();
    //this.items = this.cartService.getItems();
    // console.log(this.items)
  }


  //cart function code
  
  //----- calculate total
  get total() {
    return this.items.reduce(
      (sum, x) => ({
        qtyTotal: 1,
        offer: sum.offer + x.qtyTotal * x.offer
      }),
      { qtyTotal: 1, offer: 0 }
    ).offer;
  }

  changeSubtotal(item, index) {
    const qty = item.qtyTotal;
    const amt = item.offer;
    const subTotal = amt * qty;
    const subTotal_converted = this.currencyPipe.transform(subTotal, "INR");

    this.subTotalItems.toArray()[
      index
    ].nativeElement.innerHTML = subTotal_converted;
    this.cartService.saveCart();
    console.log('werks')
    console.log(this.items)
  }

  //----- remove specific item
  removeFromCart(item) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

  //----- clear cart item
  clearCart(items) {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.cartService.clearCart(items);
    this.items = [...this.cartService.getItems()];
  }

  //----- add item to cart
  addToCart(item) {
    if (!this.cartService.itemInCart(item)) {
      item.qtyTotal = 1;
      this.cartService.addToCart(item); //add items in cart
      //this.items = [...this.cartService.getItems()];
      
    }
  }

  // cart function code ends here

  
  public reset(): void {
    //window.location.assign('/cart');
    //this.router.navigateByUrl('/cart');

    this.router.navigate(['path/to'])
  .then(() => {
    window.location.reload();
  });
  }

}
