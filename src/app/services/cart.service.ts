import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  items = [];
  checkout:any;
  
  qr:any= 0;
  private paramSource = new BehaviorSubject(this.items);
  qty=new BehaviorSubject(this.qr)

  // changeParam(param: any) {
  //   this.paramSource.next(param)
  //   //console.log(param)
  // }

get changevar(){
  return this.qty.asObservable();
}

ger(qe){
  this.qr=qe
  console.log(this.qr)
  this.qty.next(this.qr)
  return this.qr
}
  addToCart(addedItem) {
  
    this.items.push(addedItem);

  
    // console.log(addedItem);

    //-----check if there are items already added in cart
    // let existingItems = [];
    // if ( sessionStorage.getItem('cart_items')){//----- update by adding new items
    //   existingItems = JSON.parse(sessionStorage.getItem('cart_items'));
    //   existingItems = [addedItem, ...existingItems];
    //   console.log( 'Items exists');
    // } 
    // //-----if no items, add new items
    //  else{ 
    //   console.log( 'NO items exists');
    //   existingItems = [addedItem]
    // } 

    this.saveCart();
  }

  getItems() {
    return this.items;
  } 

  loadCart() {
    this.items = JSON.parse(sessionStorage.getItem("cart_items")) ?? [];
    // this.qr = sessionStorage.getItem("count")
  }

  countr(){
    
  }

  saveCart(): void {
    sessionStorage.setItem('cart_items', JSON.stringify(this.items)); 
    console.log(this.items)
    //this.loadCart();
    
  }

  clearCart(items) {
    this.items = [];

    sessionStorage.removeItem("cart_items")
  }

  removeItem(item) {
   
    const index = this.items.findIndex(o => o.id === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
      console.log()
      this.ger(this.items.length)
    }
  }

  itemInCart(item): boolean {
    return this.items.findIndex(o => o.id === item.id) > -1;
  }

  checkoutCart(url, getData) {
    this.checkout= getData
    console.log(this.checkout)
    return this.http.post(url, getData)
  }

  

  // public editCart:any ={cart:0,products:[],subTotal:0,shippingCost:1,grandTotal:0};
  // public subject = new Subject<any>();

  // private cartSource = new BehaviorSubject(this.editCart);
  // currentCart=this.cartSource.asObservable();
  // updateCart(item){
  // this.cartSource.next(item)
  // }

}
