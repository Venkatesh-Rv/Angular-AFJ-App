import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ServService } from './serv.service';
import { ActivatedRoute,ParamMap,Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

import { map } from "rxjs/operators";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  closeResult = '';

  title = 'autocomplete';

  options = ["Sam", "Varun", "Jasmine"];

  sid;

  filteredOptions;

  cart;


  formGroup : FormGroup ;

  constructor(private modalService: NgbModal,private service : ServService, private fb : FormBuilder,
    private aroute :ActivatedRoute,
    private router: Router, private cs:CartService ) { 


  }

  //modal open for mobile nav menu
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // TODO: Cross browsing, scroll up
  // gotoTop() {
  //   window.scroll({ 
  //     top: 0, 
  //     left: 0, 
  //     behavior: 'smooth' 
  //   });
  // }

  //typeahead/auto-suggestion

 

  ngOnInit(): void {
    // this.initForm();
    // this.getNames();
  //   this.cs.loadCart();
  //   this.cart = this.cs.getItems();
  //   this.cart_count();
   }

   public reset(): void {
    //window.location.assign('/cart');
    //this.router.navigateByUrl('/cart');

    this.router.navigate(['/cart'])
  .then(() => {
    window.location.reload();
  });
  }

  // cart_count(){
  //   this.cart.forEach(ele => {
  //    console.log( ele.qtyTotal)
  //   });
  // }

  // initForm(){
  //   this.formGroup = this.fb.group({
  //     'employee' : ['']
  //   })
  //   this.formGroup.get('employee').valueChanges
  //   .pipe(debounceTime(1000))
  //   .subscribe(response => {
  //     console.log('entered data is ', response);
  //     if(response && response.length){
  //       this.filterData(response);
  //     } else {
  //       this.filteredOptions = [];
  //     }
      
  //   })
  // }

  // filterData(enteredData){
  //   this.filteredOptions = this.options.filter(item => {
  //     return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
  //   })
  // }

  // getNames(){
  //   this.service.getData().subscribe(response => {
  //     this.options = response;
  //   })
  // }

  search(event: any){
    // this.aroute.paramMap.pipe(
    //   map((param: ParamMap) => {
    //     // @ts-ignore
    //     return this.router.navigate(['prod-page',param]);
        
    //   })
    // )

    this.sid=event.target.value
    console.log(this.sid)
    this.router.navigate(['search',this.sid])
  }

}
