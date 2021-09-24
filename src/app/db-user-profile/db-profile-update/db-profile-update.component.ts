import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-db-profile-update',
  templateUrl: './db-profile-update.component.html',
  styleUrls: ['./db-profile-update.component.css']
})
export class DbProfileUpdateComponent implements OnInit {

  loaderbool:boolean =false;
  public prof_update:FormGroup;

  cover: File;
  reader = new FileReader();
  imgName: string = 'Upload Image'

  constructor(private fb:FormBuilder, private http:HttpClient,private router:Router,private ts:ToastrService) { }

  ngOnInit(): void {
    this.prof_update= this.fb.group({
      first_name:[""],
      last_name:[""],
      email:[""],
      password:[""],
      phone_number:[""],
      address:[""],
      profile_pic: [null, Validators.required]
    }
    );
  }

  onImageChanged(event) {
    
    this.cover = event.target.files[0];
    this.reader.readAsDataURL(event.target.files[0])
    console.log(this.reader);
    this.imgName = this.cover.name
    
  }

  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.prof_update.patchValue({
          profile_pic: reader.result
       });
      
        // need to run CD since file load runs outside of zone
        //this.cd.markForCheck();
      };
    }
  }

  update(){
    let ggs = JSON.stringify(this.prof_update.value["address"] = {"address":this.prof_update.value.address});
    let res = this.prof_update.value;
    // console.log(this.cover)
    // res.append('profile_pic', this.cover)
      
    console.log(this.prof_update.value);
  } 

}
