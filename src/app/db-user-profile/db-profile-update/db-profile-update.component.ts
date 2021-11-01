import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-db-profile-update',
  templateUrl: './db-profile-update.component.html',
  styleUrls: ['./db-profile-update.component.css']
})
export class DbProfileUpdateComponent implements OnInit {

  loaderbool: boolean = false;
  public prof_update: FormGroup;

  cover: File = null;
  reader = new FileReader();
  imgName: string = 'Upload Image'
  address: any = {};
  edit;

  update_resp;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private ts: ToastrService,
    private as: AuthService) { }

  ngOnInit(): void {
    this.prof_update = this.fb.group({
      first_name: [""],
      last_name: [""],
      email_id: [""],
      phone_number: [""],
      address1: [""],
      address2: [""],
      pincode:[""],
      // password: ["", Validators.required],
      profile_pic: null
    })
    this.edit = this.as.get_details();
    // Set Values
    //console.log(this.edit.address.city)
    //  this.address = this.edit.address.city
    //  this.address = this.edit.address.area
    this.prof_update.controls['first_name'].setValue(this.edit.first_name);
    this.prof_update.controls['last_name'].setValue(this.edit.last_name);
    this.prof_update.controls['email_id'].setValue(this.edit.email_id);
    this.prof_update.controls['phone_number'].setValue(this.edit.phone_number);

    this.prof_update.controls['address1'].setValue(this.edit.address.area);
    this.prof_update.controls['address2'].setValue(this.edit.address.city);
    this.prof_update.controls['pincode'].setValue(this.edit.address.pincode);

  }

  get f() { return this.prof_update.controls; }

  onDesChanged() {
    this.address.area = this.f.address1.value;
    this.address.city = this.f.address2.value;
    this.address.pincode = this.f.pincode.value;
  }

  onImageChanged(event) {

    this.cover = event.target.files[0];
    this.reader.readAsDataURL(event.target.files[0])
    console.log(this.reader);
    this.imgName = this.cover.name
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
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
    console.log(this.prof_update)
    this.loaderbool = true;
    let uploadData = new FormData();
    let check = this.cover === null
    if(check === true){
    uploadData.append('first_name', this.f.first_name.value);
    uploadData.append('last_name', this.f.last_name.value);
    uploadData.append('email_id', this.f.email_id.value);
    uploadData.append('phone_number', this.f.phone_number.value);
    this.onDesChanged();
    console.log(this.address);
    uploadData.append('address', JSON.stringify( this.address));
    }
    else{
      uploadData.append('first_name', this.f.first_name.value);
      uploadData.append('last_name', this.f.last_name.value);
      uploadData.append('email_id', this.f.email_id.value);
      uploadData.append('phone_number', this.f.phone_number.value);
      this.onDesChanged();
      console.log(this.address);
      uploadData.append('address', JSON.stringify( this.address));
      
      uploadData.append('profile_pic', this.cover);
      console.log(this.cover)
      
    }
    // uploadData.append('first_name', this.f.first_name.value);
    // uploadData.append('last_name', this.f.last_name.value);
    // uploadData.append('email_id', this.f.email_id.value);
    // uploadData.append('phone_number', this.f.phone_number.value);
    // this.onDesChanged();
    // console.log(this.address);
    // uploadData.append('address', JSON.stringify( this.address));
    
    // uploadData.append('profile_pic', this.cover);
    // console.log(this.cover)
    let getdata = []
    uploadData.forEach((value: any, key) => {
      let obj = { 'key': key, 'value': value }
      getdata.push(obj)
    });
    console.log(getdata)
    var object = getdata.reduce(
      (obj, item) => Object.assign(obj, { [item.key]: item.value }), {});

    object.address = this.address
    object.profile_pic = null
    console.log(object)


    this.as.update_adminprofile(`https://afj-staging-server.herokuapp.com/management/update/owner/profile/`, uploadData)
      .subscribe(
        ele => {
          console.log(ele)

          // for(let key in ele){
          //   this.update_resp = ele[key]
          //   if(this.update_resp === ""){

          //   }
          // }
          // this.as.owner_data(this.update_resp)

          if (ele.status === 200) {

            console.log(ele.body)
            for (let key in ele.body) {
              this.update_resp = ele.body[key];
            }
            //this.update_resp = ele.body;
            console.log(this.update_resp)

            this.as.owner_data(this.update_resp)
            this.loaderbool = false;

            uploadData.forEach((value, key) => {
              console.log(key + ":" + value)
            });
            
            this.ts.success("Profile Updated")
            this.router.navigate(["/db-profile"])
            console.log(uploadData)
          }
          else if (ele.status === 206) {
            for (let key in ele.body) {
              console.log(ele.body[key])
              var pc = ele.body[key]
            }
            this.ts.error(pc)
            this.loaderbool = false;
          }

          else {
            this.loaderbool = false;
            console.log(ele.body)
            let view = ele.body
            console.log(view)
            this.ts.error("!!!")
            // uploadData.forEach((value, key) => {
            //   console.log(key + ":" + value)
            // });
            return false
          }

        }

        , error => {
          this.loaderbool = false;
          // uploadData.forEach((value, key) => {
          //   console.log(key + ":" + value)
          // });
          //this.ts.info()
          this.ts.error(error.status)

          // window.location.href = 'URL';
        })

  }

}
