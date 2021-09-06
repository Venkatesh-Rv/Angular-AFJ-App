import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  details=[];
  data=[];
  
  constructor(private cs:CartService, private router:Router, private ts : ToastrService) { }

  ngOnInit(): void {
    this.result();
  }

  result(){
    //address
    this.details.push(this.cs.checkout)
    // this.details = this.cs.checkout;
    console.log(this.details)

    //data-products
    this.data = this.cs.items;
    console.log(this.data)
  }

  response(){
    this.ts.success('Thanks for purchasing...');
    this.router.navigate(['/'])
  }

}
