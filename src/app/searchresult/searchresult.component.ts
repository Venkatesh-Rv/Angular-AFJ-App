import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { SearchService } from '../services/search.service';
import { BehaviorSubject,Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ServService } from '../homepage/header/serv.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {

   cat2;
  url;
  res;
  currentNameSubject$ = new BehaviorSubject('a');
  observable: Observable<any>;

  constructor(private aroute:ActivatedRoute, private ss:ServService, private ts :ToastrService) { 
    // this.observable = this.getObservable();
  }

  // getObservable() {
  //   this.ts.warning(this.cat2)
  //   console.log(this.cat2)
  //   return this.cat2
  // }

  ngOnInit(): void {
    this.aroute.queryParamMap
    .subscribe((params:any) => {
      
      // this.cat2 = params.params.cat
      // this.currentNameSubject$.subscribe(val=>{
      //   this.ts.warning(val)
      //   console.log(val)
      // })
      
     
      
        // if (prod.image_url !== null) {
        //   this.thumbimages = prod.image_url.split(';');
        // }

      
      // this.orderObj = { ...params.keys, ...params };
     
    }
  );

  this.ss.receivedMessage().subscribe(ele =>{
    this.cat2 =ele;
  })
  }

}
