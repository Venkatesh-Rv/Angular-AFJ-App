import { Component, OnInit,ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ServService } from './serv.service';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute,ParamMap,Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

import { map } from "rxjs/operators";
import { Observable,Subject } from 'rxjs';
import { HomepagesectionService } from 'src/app/services/homepagesection.service';
import { Toast, ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
  closeResult = '';

  title = [];

  options = ["Sam", "Varun", "Jasmine"];

  sid;

  filteredOptions;

  cart;


  formGroup : FormGroup ;

  constructor(private modalService: NgbModal,private service : SearchService, private fb : FormBuilder,
    private aroute :ActivatedRoute,private ts:ToastrService,private s : ServService,
    private router: Router, private cs:CartService, private hs:HomepagesectionService ) { 


  }
  keyword = 'name';

  data = [];

  

  datac = [
    {
      name: 'necklace'
    },
    { id: 'd29f22ee-7c93-444d-8410-5b48ec487c87', name: 'rings', category: 'Rings', price: '1500' }
  ];

  data2 = [
    {
      name: 'new'
    },
    {
      name: 'Tanishq'
    }
  ];

  data3 = [
    {
      name: 'marriage'
    },
    {
      name: 'bridal'
    }
  ];

  click() {
    
    this.data = this.datac
  }
  click2() {
    this.data = this.data2
  }
  click3() {
    this.data = this.data3
  }

  private hpNecklace() {
    this.hs.homeSection('necklace').subscribe(data => {
      //data storing for use in html component
      
      console.log(data)
    }, error => console.error(error));

  }

pass(cat){
  this.router.navigate(['/search'], { queryParams: { cat: cat } });
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

 qwe:Observable<number>

  ngOnInit(): void {
    // this.initForm();
    // this.getNames();
  //   this.cs.loadCart();
  //   this.cart = this.cs.getItems();
  //   this.cart_count();
  this.qwe=this.cs.changevar
  //console.log(this.qwe)

  this.title= this.cs.count

  this.data = this.datac;
   }

   public reset(): void {
    //window.location.assign('/cart');
    //this.router.navigateByUrl('/cart');

    this.router.navigate(['/cart'])
  .then(() => {
    //window.location.reload();
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
    //console.log(this.sid)
    this.router.navigate(['search',this.sid])
  }

  private userIdSubject = new Subject<string>();

  readonly blogPosts$ = this.userIdSubject.pipe(
    debounceTime(550),
    distinctUntilChanged(),
    switchMap(userId => this.service.fetchPosts(userId))
  );

  searchPosts(userId: string) {
    this.userIdSubject.next(userId);
  }

  go(data){
    
    
  }

  @ViewChild('auto') auto;
  selectEvent(item) {
    // do something with selected item
    // this.ts.info(item.name)
    var n = item.name
    this.s.sendMessage(item.name);
    this.router.navigate(['/search'], { queryParams: { n} });
    console.log(item)
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    
  }
  
  onFocused(e){
    // do something when input is focused
    this.auto.close();
  }

}
