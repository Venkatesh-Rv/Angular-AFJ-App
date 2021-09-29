import { Component, OnInit,NgModule } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../services/post.service';
import { SucesslogginggService } from '../services/sucessloggingg.service';

import { BannerModel } from './banner.model';

import {HttpClient} from "@angular/common/http"


@Component({
  selector: 'app-banner-view',
  templateUrl: './banner-view.component.html',
  styleUrls: ['./banner-view.component.css']
})
export class BannerViewComponent implements OnInit {

  bannerModelObj : BannerModel = new BannerModel();
  banner;
  loaderbool: boolean = false;
  objbanr:any={};
  result;
  name: string;
  selectCat: string;
  cover: File;
  imgName: string = 'Upload Image';
  changeporperty: string;
  buttonboool: boolean = true;

  //page
  totalNumber:number;
  page:number=1;

//img retrieve
  imgUrl: string = '';
  imageToShow: any;
  isImageLoading: boolean;

  //modal
  closeResult = '';
  searchText = '';
  term;

  formValue!:FormGroup;

  constructor(private formBuilder: FormBuilder, private ps:PostService, private successmsg:SucesslogginggService,
    private modalService: NgbModal,private http:HttpClient) { }

  ngOnInit(): void {
    //this.getAllBanner();
    this. getImageFromService();
  }

  getAllBanner(){
    this.ps.getData().subscribe(res=>{
      
      this.banner= res
      console.log(this.banner)
      
    }, error=>{
      console.error('error')
      console.log(error)
    })
   
    //this.imgName=this.banner.image
  }

  onNameChanged(event: any) {

    this.name = event.target.value;
    console.log(this.name)

  }

  onImageChanged(event) {

    this.cover = event.target.files[0];
    console.log(this.cover);
    this.imgName = this.cover.name
  }

  onSelectChange(event) {

    this.selectCat = event.target.value;
    console.log(this.selectCat);

    this.buttonboool = true
    // this.switchcase(this.selectCat)


  }


  onEdit(row:any){
    this.bannerModelObj.id = row.id;
    console.log(this.bannerModelObj.id)
    this.update(this.bannerModelObj.id)
  }

  update(id){
    this.ps.getData().subscribe(ele => {
      this.result= ele.success
      console.log(this.result)
  
      this.result.forEach(ele => {
  
        //console.table(ele)
        if (ele.id === id) {
          console.log('hellobanner')
          this.objbanr = ele
          this.name=this.objbanr.name;
          // this.cover=this.objbanr.image.blob();
          this.imageToShow = ele.image_url;
          this.selectCat=this.objbanr.category;
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
    uploadData.append('name', this.name);
    // uploadData.append(`${this.changeporperty}_cosmetics_image`, this.cover, this.cover.name);
   
    uploadData.append('image', this.cover);
    // uploadData.append('image',this.imageToShow)
    uploadData.append('category', this.selectCat);

    this.loaderbool = true;
  //   for (var i of uploadData.values()) {
  //     console.log(i);
  //  }
   var send ='http://ec2-13-232-92-217.ap-south-1.compute.amazonaws.com/product/banner/update/?banner_id='+ this.bannerModelObj.id;
    this.ps.updateData(send, uploadData).subscribe(ele => {
      this.successmsg.SuccessLog(ele, 'banner')

    },error => {
      this.loaderbool=false;
      alert('Please enter the details correctly!!')
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


