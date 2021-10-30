import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { PostService } from "../services/post.service"
import { SucesslogginggService } from "../services/sucessloggingg.service"
import { AuthService } from '../auth/services/auth.service';


@Component({
  selector: 'app-banner-upload',
  templateUrl: './banner-upload.component.html',
  styleUrls: ['./banner-upload.component.css']
})
export class BannerUploadComponent implements OnInit {

  name: string;
  loaderbool: boolean = false;

  closeResult = '';

  cover: File;
  objectURL;
  reader = new FileReader();
  imgName: string = '';
  uploadedFile:any;
  uploadedFiles: any[] = [];
  check:boolean = false;
  description: any = {};
  price: string;
  Discount: string;
  selectCat: string;
  buttonboool: boolean = true;
  submitted:boolean= false;
  activeIndex1: number = 0;
  

  constructor(private http: HttpClient, private toastr: ToastrService, 
    private route: Router, private postMethod: PostService,
    private successmsg: SucesslogginggService,
    private modalService: NgbModal, private as:AuthService) { }

  ngOnInit(): void {
    // this.editBanner();
    var data = {
      "refresh_token":localStorage.getItem('refresh_token')
    }
    console.log(data)
    var url= 'https://afj-staging-server.herokuapp.com/refresh/token/'
    // this.as.refreshTokent(url,data).subscribe(ele =>{
    //   console.log(ele)
    // })

    // this.as.hs().subscribe(ele =>{
    //   console.log(ele)
    // })
  }

  //modal for preview
open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
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
//modal ends here

  onNameChanged(event: any) {

    this.name = event.target.value;
    console.log(this.name)

  }
  
  my() {
  //  this.route.navigate(['/ban-upload'])
  window.location.reload();
  }

  onUpload(event) {
    
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

  onImageChanged(evt:any) {
    
    this.uploadedFile = evt[0];
    // this.uploadedFiles = evt[0];
    this.reader.readAsDataURL(evt[0])
    this.cover = evt[0];
    this.imgName = this.cover.name;
    this.objectURL = null;
    this.objectURL = URL.createObjectURL(this.cover)
    console.log(this.reader.result)
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
    this.toastr.error("Format is not supported")
  }
  }

  dummy: any = [ 
  
  {image:this.reader.result}
  ];


  //   onfeatureChanged(event){

  // console.log(event.target.value);

  // this.description.features=event.target.value
  //   }


  //   onDesChanged(event){

  //     this.description.des=event.target.value;

  // console.log(this.description)

  //   }


  //   onPriceChanged(event){

  // this.price=event.target.value;

  //   }
  //   onDiscountChanged(event){
  // this.Discount=event.target.value;

  //   }


  onSelectChange(event) {

    this.selectCat = event.target.value;

    this.buttonboool = true
    // this.switchcase(this.selectCat)


  }

  url: string = 'http://127.0.0.1:8000/'

  
  

  uploadBanner() {
    const uploadData = new FormData();
    uploadData.append('banner_name', this.name);
    // uploadData.append('category', this.selectCat);
    uploadData.append('banner_pic', this.cover);

    this.loaderbool = true;
  //   for (var i of uploadData.values()) {
  //     console.log(i);
  //  }
    this.postMethod.postData(`https://afj-staging-server.herokuapp.com/banner/create/`, uploadData).subscribe(ele => {
      this.successmsg.SuccessLog(ele, 'ban-view')
      for (const entry of uploadData.getAll('banner_pic'))
    {
        console.log(entry)
    }
      this.loaderbool=false

    },error => {
      this.loaderbool=false;
      this.toastr.error('Please enter the details correctly!!')
      })


    
    //      this.http.post(`http://127.0.0.1:8000/${this.selectCat}/banner/create/`,uploadData).subscribe(ele => {

    //  console.log(ele);
    //  if(ele){

    //   this.toastr.success('Your data has been recorded sucessfully', 'Sucess', {
    //     timeOut: 3000,
    //   });

    // this.route.navigate(['/Cosmetictabel'])

    //  }

    //      })
    // this.http.post(`http://ec2-15-206-189-63.ap-south-1.compute.amazonaws.com/${this.selectCat}/banner/create/`,uploadData).subscribe(ele => {

    //    console.log(ele)

    //       })

  }

  // editBanner(){
  //   const editData = new FormData();
  //       for (var i of editData.values()) {
  //     console.log(i);
  //  }
  //   // console.log(editData.values)

  // }

  private switchcase(getInput) {

    switch (getInput) {

      case "Please Select the option":

        this.buttonboool = true
        break

      case "cosmetics":
        this.buttonboool = false


      case "fashion":
        this.buttonboool = false
    }

  }

}
