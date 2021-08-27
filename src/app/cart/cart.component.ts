import { Component, OnInit,QueryList,
  ViewChildren,
  ElementRef, 
  Input} from '@angular/core';
import { CartService } from '../services/cart.service';
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() data;
  
  qwerty=''
  items = [];
  msg=['hello','every','one','gm']

  constructor(private cartService:CartService,private currencyPipe:CurrencyPipe) { }

  ngOnInit(): void {

    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    console.log(this.items)
    
    
    
    //this.items = [...this.cartService.getItems()]
    //this.cartService.changeParam(this.items);

    // this.cartService.sharedParam.subscribe(
    //   ele=>{
    //     this.items=ele;
    //     console.log(ele)
    //   }
    // )

      
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
    const subTotal_converted = this.currencyPipe.transform(subTotal, "INR");

    this.subTotalItems.toArray()[
      index
    ].nativeElement.innerHTML = subTotal_converted;
    this.cartService.saveCart();
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

  checkout(){
    console.table(this.items)
    const json_data = JSON.stringify(this.items);
    console.log(json_data)

    this.cartService.checkoutCart(`https://fakestoreapi.com/products`, json_data).subscribe(ele => {
      //this.successmsg.SuccessLog(ele, 'banner')
      alert("Sent")

    },error => {
      //this.loaderbool=false;
      alert('Please enter the details correctly!!')
      })
  }

}
