import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'AFJ-App';
  public phone = "THE PHONE NUMBER IN INTERNATIONAL FORMAT WITHOUT THE PLUS SIGN"
  public msg = "THE PRESET MESSAGE TO SEND";

  totalr:number=0
  items=[];

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    // this.items = this.cartService.getItems();
    // //console.log(this.items)
    
    // this.items.forEach(ele=>this.totalr+=ele.qtyTotal)
    // //console.log(this.totalr)
    // this.cartService.ger(this.totalr)
  }
}

