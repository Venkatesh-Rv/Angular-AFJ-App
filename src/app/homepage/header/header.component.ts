import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ServService } from './serv.service';



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

  filteredOptions;


  formGroup : FormGroup ;

  constructor(private modalService: NgbModal,private service : ServService, private fb : FormBuilder) { 


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
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  //typeahead/auto-suggestion

 

  ngOnInit(): void {
    // this.initForm();
    // this.getNames();
  }

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

}
