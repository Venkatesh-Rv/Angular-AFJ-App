import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { SortEvent } from 'primeng/api';
import { PostService } from '../services/post.service';
import { ProductModel } from './editproduct.model';


@Component({
  selector: 'app-db-prod-items',
  templateUrl: './db-prod-items.component.html',
  styleUrls: ['./db-prod-items.component.css']
})
export class DbProdItemsComponent implements OnInit {
  message;
  formValue: FormGroup;
  public ProductUp: FormGroup;
  productModelObj : ProductModel = new ProductModel();
  allproductData:any;
  productshow:any;
  result:any;
  closeResult = '';

  //prime table
  displayModal: boolean = false;
  selectedCustomer: any;

  cols: any[];

  exportColumns: any[];

  first = 0;
  rows = 5;

  //edit form data
  objprod: any = {}
  catsel
  cover: File = null;
  reader = new FileReader();
  imgName: string = 'Upload Image'
  address: any = {};

  loaderbool: boolean = false;
  check:boolean;

  constructor(private http:HttpClient, private post:PostService, private ts:ToastrService,
    private fb: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllProduct();
    // this.message = this.post.getProd();
    // console.log(this.message)
    this.ProductUp = this.fb.group({
      category: [""],
      product_pic:[""],
      name: [""],
      price:[""],
      description: [""],
      discount: [""]
    }
      
    )
    // this.ProductUp.controls['name'].setValue(this.objprod.name);
    // this.f.controls['description'].setValue(this.objprod.description);
    // this.f.controls['price'].setValue(this.objprod.price);
    // this.f.controls['offerprice'].setValue(this.objprod.discount);
    // this.f.controls['category'].setValue(this.objprod.category);
  }

  getAllProduct(){
    this.post.getProduct().subscribe(res=>{
      console.log(res)
      for (let key in res) {
        this.allproductData = res[key];
      }
      this.productshow = this.allproductData;
    })
  }

  get f() { return this.ProductUp.controls; }

  onFileSelect(event) {

    this.cover = event.target.files[0];
    this.reader.readAsDataURL(event.target.files[0])
    console.log(this.reader);
    console.log(this.cover);
    this.imgName = this.cover.name

    
  //   var new_str = this.imgName.substr(-4);
  //   var new_str1 = this.imgName.substr(-5);
  //   if(new_str === '.jpg'){
  //     (<HTMLInputElement> document.getElementById("vc")).disabled = false;
  //     return this.check=false;
      
  // }
  // else if(new_str1 === '.jpeg'){
  //   (<HTMLInputElement> document.getElementById("vc")).disabled = false;
  //   return this.check=false;

  // }
  // else{
  //   this.check = true;
  //   (<HTMLInputElement> document.getElementById("vc")).disabled = true;
  //   this.ts.error("Format is not supported")
  // }

    // const file=(event.target as HTMLInputElement).files[0];
    // this.formValue.patchValue({
    //   sampleFile: this.cover
    // });
    // this.formValue.get('sampleFile').updateValueAndValidity();
  }

  onDesChanged() {
    this.address.about = this.f.description.value;
    console.log(this.address)
  }

  onEdit(row:any){
    // this.showCreate = false;
    // this.showUpdate = true;
    this.productModelObj.id = row.id;
    this.productModelObj.product_url = row.product_url;
    console.log(row.name)
    this.f['name'].setValue(row.name);
    this.f['description'].setValue(row.description.about);
    this.f['price'].setValue(row.price);
    this.f['discount'].setValue(row.discount);
    console.log(row.category)
    this.f['category'].setValue(row.category);
    this.catsel =  this.f.category.value
    console.log(this.productModelObj.id)
    this.update(this.productModelObj.id)
  }

  update(id){
    this.post.getProduct().subscribe(ele => {
      this.result= ele.message
      this.result.forEach(ele => {
  
        if (ele.id === id) {
          console.log('hello')
          this.objprod = ele
          console.log(this.objprod)
  
        }
        return
      })
  
    })
    console.log(this.objprod)
   }

   cc(){
     
     const uploadData = new FormData();
     uploadData.append('name', this.f.name.value);
     uploadData.append('category', this.f.category.value)
     this.onDesChanged();
     uploadData.append('description',this.address)
     uploadData.append('price',this.f.price.value)
     uploadData.append('discount',this.f.discount.value)
     
  uploadData.forEach((value, key) => {
      console.log(key + ":" + value)
    });

   }

   afterDisc;
   discount(){
   
    let bill= this.f.price.value;
    var discount= this.f.discount.value;
    var afterDiscount = bill - (bill * discount / 100);
    this.afterDisc = afterDiscount;
    // this.ts.success(''+ afterDiscount);
    this.ts.success(this.afterDisc)
    console.log("After discount your price is: " + afterDiscount);
  }
  
  
   editSubmit(){
    this.loaderbool = true;
    const uploadData = new FormData();
    // console.log(this.cover ===null)

    let check = this.cover === null
    console.log(check)
    if(check === true){
      uploadData.append('name', this.f.name.value);
      uploadData.append('category', this.f.category.value)
      this.onDesChanged();
      uploadData.append('description',JSON.stringify(this.address))
      uploadData.append('price',this.f.price.value)
      
      uploadData.append('discount',this.f.discount.value)
     
    }
    else{
      uploadData.append('name', this.f.name.value);
      uploadData.append('category', this.f.category.value)
      this.onDesChanged();
      uploadData.append('description',JSON.stringify(this.address))
      uploadData.append('price',this.f.price.value)
      
      uploadData.append('discount',this.f.discount.value)
      uploadData.append('product_pic',this.cover)
    }

  // uploadData.append('name', this.f.name.value);
  // uploadData.append('category', this.f.category.value)
  // this.onDesChanged();
  // uploadData.append('description',JSON.stringify(this.address))
  // uploadData.append('price',this.f.price.value)
  // uploadData.append('discount',this.f.discount.value)

  uploadData.forEach((value, key) => {
    console.log(key + ":" + value)
  });
  

   var send ='https://afj-staging-server.herokuapp.com/product/update/?product_id='+ this.productModelObj.id;
    this.post.updateData(send, uploadData).subscribe(ele => {
      this.loaderbool =false;
      console.log(ele)
      // location.reload();
      
      this.ts.success("Updated Successfully")
      window.location.reload()
      
      //this.successmsg.SuccessLog(ele, 'ban-view')

    },error => {
      this.loaderbool=false;
      alert('Please enter the details correctly!!')
      console.log(send)
      })

   }


   editProductDetails(){
    this.productModelObj.name = this.formValue.value.name;
    this.productModelObj.description = this.formValue.value.description.about;
    this.productModelObj.price = this.formValue.value.price;
    this.productModelObj.offerprice = this.formValue.value.offerprice;
    this.productModelObj.category = this.formValue.value.category;

    this.post.updateProduct(this.productModelObj,this.productModelObj.id)
    .subscribe(res=>{
      this.ts.success("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllProduct()
    })

  }

  showModalDialog() {
    this.displayModal = true;
}


   //Sort By header

   customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
}

//Pagination

next() {
 
  this.first = this.first + this.rows;
  console.log(this.first)
}

prev() {
  this.first = this.first - this.rows;
}

reset() {
  this.first = 0;
}

isLastPage(): boolean {
  return this.productshow? this.first === (this.productshow.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.productshow ? this.first === 0 : true;
}

//Export as files

exportExcel() {
  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.productshow);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    this.saveAsExcelFile(excelBuffer, "prime");
  });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  });
}

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
  


}
