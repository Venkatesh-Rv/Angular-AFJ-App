import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

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
  address;

  constructor(private fb:FormBuilder, private http:HttpClient,private router:Router,private ts:ToastrService,
    private as:AuthService) { }

  ngOnInit(): void {
    this.prof_update= this.fb.group({
      first_name:[""],
      last_name:[""],
      email_id:[""],
      phone_number:[""],
      address:[""],
      password:[""],
      profile_pic:"null"
    }
    );
  }

  get f() { return this.prof_update.controls; }

  onDesChanged() {
    this.address.city = this.f.address.value;
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

  update() {
    let uploadData = new FormData();
    uploadData.append('first_name', this.f.first_name.value);
    uploadData.append('last_name', this.f.last_name.value);
    uploadData.append('email_id', this.f.email_id.value);
    uploadData.append('phone_number', this.f.phone_number.value);
    this.onDesChanged();
    console.log(this.address);
    uploadData.append('address', JSON.stringify(this.address));
    uploadData.append('password', this.f.password.value);
    uploadData.append('profile_pic', this.cover);
    

    uploadData.forEach((value,key) => {
      console.log(key+":"+value)
    });

    this.loaderbool = true;
    this.loaderbool =false;

    this.as.update_adminprofile(`https://afj-staging-server.herokuapp.com/management/update/owner/profile`, uploadData)
    .subscribe(
      ele =>{ 
        this.ts.success("Account Updated Successfully")
        console.log(uploadData)
        this.router.navigate(['/db-profile'])
    // window.location.reload();
  }
    
    ,error => {
      this.loaderbool=false;
      this.ts.error('Error, Please enter the details correctly!!')
      
      // window.location.href = 'URL';
      })

  }

}
