import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {

  addressForm: any;
  details:any;


  constructor(private ts:ToastrService, private router:Router, private cs:CartService) { }

  ngOnInit(): void {
    this.addressForm = new FormGroup({
      'name':new FormControl('',Validators.required),
      'HouseName':new FormControl('',Validators.required),
      'Address':new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'email':new FormControl(null,[Validators.required, Validators.email]),
      'phone' : new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
        ]),
      'pincode':new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'landmark': new FormControl('',Validators.required),
      'state': new FormControl('',Validators.required),
      'city': new FormControl('',Validators.required),
      'district': new FormControl(''),
      'alt': new FormControl('')

  })




  }
  clicksub() {
   
    this.details= this.addressForm.value;
    console.log(this.cs.checkout);
    console.log(this.details);
    
    //this.addressForm.reset();
    this.ts.success('Thanks for purchasing...');
    this.router.navigate(['/'])

  }


  get name() {
    return this.addressForm.get('name');
  }
  get email() {
    return this.addressForm.get('email');
  }
  get phone() {
    return this.addressForm.get('phone');
  }
  get pincode() {
    return this.addressForm.get('pincode');
  }

  get Address() {
    return this.addressForm.get('Address');
  }

  get HouseName() {
    return this.addressForm.get('HouseName');
  }

  get landmark() {
    return this.addressForm.get('landmark');
  }

  get state() {
    return this.addressForm.get('state');
  }

  get city() {
    return this.addressForm.get('city');
  }
}
