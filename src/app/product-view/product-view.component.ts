import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";
import { ProductService } from '../services/product.service'; 

// interface Food {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})

export class ProductViewComponent implements OnInit {
  id: Number;
  product;

  constructor(private route:ActivatedRoute, private productService:ProductService ){}
  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];

  ngOnInit(): void {

    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe(prod => {
        this.product = prod;
        // if (prod.image_url !== null) {
        //   this.thumbimages = prod.image_url.split(';');
        // }

      });
    });
  }

}
