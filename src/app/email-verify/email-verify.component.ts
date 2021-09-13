import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {

  co_email;
  arr: boolean = false;
  vp: boolean = true;
  loaderbool: boolean = false;
  constructor(private route: Router, private cs: CartService, private ts: ToastrService) { }

  ngOnInit(): void {
  }

  email(event: any) {
    this.co_email = event.target.value;
    //console.log(this.co_email);
  }

  verify() {
    this.loaderbool = true;
    this.cs.email_verify("https://fakestoreapi.com/products", this.co_email).subscribe(ele => {
      console.log(this.co_email);
      this.ts.success('mail verified successfully')
      this.vp = false;
      this.loaderbool = false;
      this.arr = true;
      console.log(this.arr)
      console.log(this.cs.items, this.cs.checkout)
      // this.route.navigate(['/details'])

    }, error => {
      this.arr = false;
      this.ts.warning('Error')
    })
  }

  page(){
    this.route.navigate(['/'])
    this.ts.success('Thanks for purchasing...');
  }

}


