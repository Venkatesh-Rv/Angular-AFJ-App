import { Component, OnInit,QueryList,
  ViewChildren,
  ElementRef, 
  Input} from '@angular/core';
  import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CurrencyPipe } from "@angular/common";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() data;
  
  asdf;
  items = [];
  msg=['hello','every','one','gm']
  totalr:number=0

  constructor(private cartService:CartService,private currencyPipe:CurrencyPipe, private ts:ToastrService,private router: Router) { }

  ngOnInit(): void {

    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    console.log(this.items)
    
    this.items.forEach(ele=>this.totalr+=ele.qtyTotal)
    console.log(this.totalr)
    this.cartService.ger(this.totalr)
    
    //
    //this.items = [...this.cartService.getItems()]
    //this.cartService.changeParam(this.items);

    // this.cartService.sharedParam.subscribe(
    //   ele=>{
    //     this.items=ele;
    //     console.log(ele)
    //   }
    // )
    
    // this.asdf=this.cartService.countr()
    // console.log(this.asdf)
      
  }


  @ViewChildren("subTotalWrap") subTotalItems: QueryList<ElementRef>;

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
    // const subTotal_converted = this.currencyPipe.transform(subTotal, "INR");

    // this.subTotalItems.toArray()[
    //   index
    // ].nativeElement.innerHTML = subTotal_converted;
    this.cartService.saveCart();
    this.ts.success('Cart Updated')
     //this.countr();
  }

  btn(){
    this.countr();
  }

  countr(){
    console.log('workkksss')
     this.items.forEach(ele=>this.totalr+=ele.qtyTotal)
     console.log(this.totalr)
    this.cartService.ger(this.totalr)
   }

  //----- remove specific item
  removeFromCart(item) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
    this.ts.warning('Item Removed')
  }

  //----- clear cart item
  clearCart(items) {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.cartService.clearCart(items);
    this.items = [...this.cartService.getItems()];
    this.ts.warning('All Items Removed')
  }

  checkout(){
    console.table(this.items)
    const json_data = JSON.stringify(this.items);
    console.log(json_data)

    this.cartService.checkoutCart(`https://fakestoreapi.com/products`, json_data).subscribe(ele => {
      //this.successmsg.SuccessLog(ele, 'banner')
      this.ts.success('Thanks for purchasing, Lets CheckOut..!!')
      this.router.navigate(['/details'])

    },error => {
      //this.loaderbool=false;
      this.ts.warning('Error')
      })
  }


  // value = 0;

  // handleMinus() {
  //   this.value--;  
  // }
  // handlePlus() {
  //   this.value++;    
  // }

}
