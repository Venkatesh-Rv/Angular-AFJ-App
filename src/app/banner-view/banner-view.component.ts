import { Component, OnInit,NgModule } from '@angular/core';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { FormBuilder,FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../services/post.service';
import { SucesslogginggService } from '../services/sucessloggingg.service';

import { BannerModel } from './banner.model';

import {HttpClient} from "@angular/common/http"
import { SortEvent } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-banner-view',
  templateUrl: './banner-view.component.html',
  styles:[`

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
`],
  styleUrls: ['./banner-view.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class BannerViewComponent implements OnInit {

  bannerModelObj : BannerModel = new BannerModel();
  banner;
  loaderbool: boolean = false;
  objbanr:any={};
  result;
  name: string;
  selectCat: string;
  banneredit: any;
  cover: File=null;
  reader = new FileReader();
  uploadedFile;
  check:boolean = false;
  imgName: string = 'Upload New Image';
  changeporperty: string;
  buttonboool: boolean = true;
  bannerDialog: boolean;
  anim:boolean =false;

  prime:any =[];

  selectedCustomer: any;

  cols: any[];

  exportColumns: any[];

  //page
  totalNumber:number;
  page:number=1;

  first = 0;
  rows = 5;
  

//img retrieve
  imgUrl: string = '';
  imageToShow: any;
  isImageLoading: boolean;

  //modal
  closeResult = '';
  displayModal: boolean = false;
  searchText = '';
  term;
  
  showModalDialog() {
    this.displayModal = true;
}

 showEditDialog(){
   this.bannerDialog =true;
 }

  formValue!:FormGroup;

  constructor(private formBuilder: FormBuilder, private ps:PostService, private successmsg:SucesslogginggService,
    private modalService: NgbModal,private http:HttpClient, private ts:ToastrService) { }

  ngOnInit(): void {
    this.getAllBanner();
    console.log(this.cover)

    this.cols = [
      { field: "Image", header: "Image" },
      { field: "Name", header: "Name" },
      { field: "Created At", header: "Created At" },
      { field: "None", header: "None" }
    ];

    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.anim = true
  }, 3000);
    
  }

  // get sortData() {
  //   return this.data.sort((a, b) => {
  //     return <any>new Date(b.CREATE_TS) - <any>new Date(a.CREATE_TS);
  //   });
  // }

  getAllBanner() {
    this.ps.getData().subscribe(res => {

      this.banner = res
      console.log(this.banner.message)
      let ts;
      ts = this.banner.message;
     
      let rr = '?random+\=' + Math.random()
      for (let key in this.banner.message) {
        this.banner.message[key].banner_url = this.banner.message[key].banner_url +rr;
      }
      this.prime = this.banner.message;
      console.log(this.prime)
      console.log(ts)
      
    })

    //this.imgName=this.banner.image
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
  return this.prime? this.first === (this.prime.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.prime ? this.first === 0 : true;
}

//Export as files

// exportExcel() {
//   import("xlsx").then(xlsx => {
//     const worksheet = xlsx.utils.json_to_sheet(this.prime);
//     const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
//     const excelBuffer: any = xlsx.write(workbook, {
//       bookType: "xlsx",
//       type: "array"
//     });
//     this.saveAsExcelFile(excelBuffer, "prime");
//   });
// }

// saveAsExcelFile(buffer: any, fileName: string): void {
//   import("file-saver").then(FileSaver => {
//     let EXCEL_TYPE =
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//     let EXCEL_EXTENSION = ".xlsx";
//     const data: Blob = new Blob([buffer], {
//       type: EXCEL_TYPE
//     });
//     FileSaver.saveAs(
//       data,
//       fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
//     );
//   });
// }


  onNameChanged(event: any) {

    this.name = event.target.value;
    console.log(this.name)

  }
  


  onImageChanged(evt:any) {

    this.uploadedFile = evt[0];
    // this.uploadedFiles = evt[0];
    this.reader.readAsDataURL(evt[0])
    this.cover = evt[0];
    this.imgName = this.cover.name;
    console.log(this.uploadedFile)

    var new_str = this.imgName.substr(-4);
    var new_str1 = this.imgName.substr(-5);
    if(new_str === '.jpg'){
      (<HTMLInputElement> document.getElementById("vc")).disabled = false;
      return this.check=false;
  }
  else if(new_str1 === '.jpeg'){
    (<HTMLInputElement> document.getElementById("vc")).disabled = false;
    return this.check=false;

  }
  else{
    this.check = true;
    (<HTMLInputElement> document.getElementById("vc")).disabled = true;
    this.ts.error("Format is not supported")
  }
  }

  onSelectChange(event) {

    this.selectCat = event.target.value;
    console.log(this.selectCat);

    this.buttonboool = true
    // this.switchcase(this.selectCat)


  }

  edit(product:any){
    this.cover = null;
    this.imgName = "";
    this.check = false;
    this.bannerModelObj.id = product.id;
    this.banneredit= product;
    console.log(this.banneredit)
    this.bannerDialog = true;
  }

  onEdit(row:any){
    this.cover = null
    this.imgName = 'Upload Image'
    console.log(this.cover ===null)
    this.bannerModelObj.id = row.id;
    console.log(this.bannerModelObj.id)
    this.update(this.bannerModelObj.id)
  }

  update(id){
    this.ps.getData().subscribe(ele => {
      console.log(ele)
      this.result= ele.message
      console.log(this.result)
  
      this.result.forEach(ele => {
  
        //console.table(ele)
        if (ele.id === id) {
          console.log('hellobanner')
          this.objbanr = ele
          this.name=this.objbanr.banner_name;
          // this.cover=this.objbanr.image.blob();
          this.imageToShow = ele.banner_url;
          //this.selectCat=this.objbanr.category;
          console.log(this.cover)
          console.log(this.objbanr)
  return
        }
        return 
      })
  
    })
    //console.log(this.objbanr)
   }

   deletebanner(row){
    //this.bannerModelObj.id = row.id;
    var send ='http://ec2-13-232-92-217.ap-south-1.compute.amazonaws.com/product/banner/delete/?banner_id='+ row;
    console.log(row)
    console.log(send)
    this.ps.deleteData(send,row).subscribe(ele => {
      this.successmsg.SuccessLog(ele, 'banner')
      this.getAllBanner();

    },error => {
      this.loaderbool=false;
      alert('Please enter the details correctly!!')
      })
  }

   editSubmit(){
    const uploadData = new FormData();
    console.log(this.cover ===null)

    let check = this.cover === null
    if(check === true){
      uploadData.append('banner_name', this.banneredit.banner_name);
    }
    else{
      uploadData.append('banner_name', this.banneredit.banner_name);
      uploadData.append('banner_pic', this.cover);
    }

    this.loaderbool = true;
  //   for (var i of uploadData.values()) {
  //     console.log(i);
  //  }
   var send ='https://afj-staging-server.herokuapp.com/banner/update/?banner_id='+ this.bannerModelObj.id;
    this.ps.updateData(send, uploadData).subscribe(ele => {
      this.loaderbool =false;
      console.log(ele)
      this.getAllBanner();
      this.ts.success("Updated Successfully")
      this.bannerDialog = false;
      
      //this.successmsg.SuccessLog(ele, 'ban-view')

    },error => {
      this.loaderbool=false;
      alert('Please enter the details correctly!!')
      console.log(send)
      })

   }

   //image retrieve

   createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
       console.log(reader)
    }
   }
 
   getImageFromService() {
       this.isImageLoading = true;
       this.ps.getImage(this.imgUrl).subscribe(data => {
         this.createImageFromBlob(data);
         this.isImageLoading = false;
       }, error => {
         this.isImageLoading = false;
         console.log(error);
       });
   }

   // modal code (popup)
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


