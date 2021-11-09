import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';

import { PasswordStrengthValidator } from '../password-strength.validators';
import { ConfirmedValidator } from '../confirmed.validator';

@Component({
  selector: 'app-db-register',
  templateUrl: './db-register.component.html',
  styleUrls: ['./db-register.component.css']
})
export class DbRegisterComponent implements OnInit {

  public register: FormGroup;
  submitted = false;
  msg;

  //passwordPtn ='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  loaderbool: boolean = false;
  address: any = {};
  cover: File = null;
  reader = new FileReader();
  imgName: string = 'Upload Image'



  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private ts: ToastrService,
    private as: AuthService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      first_name: ["",[Validators.required,Validators.minLength(4)]],
      // last_name: [null],
      email_id: ["",[Validators.required, Validators.email]],
      phone_number: ["",[Validators.required,Validators.minLength(10)]],
      address1: ["",Validators.required],
      // address2: ["",Validators.required],
      // profile_pic: [null,Validators.required],
      password: [null, Validators.compose([
        Validators.required, Validators.minLength(8), PasswordStrengthValidator])],
      cpassword: [null, Validators.compose([
        Validators.required])]
    },
      {
        validator: ConfirmedValidator('password', 'cpassword')
      }
    )

    ///test

  }

  get f() { return this.register.controls; }

  onDesChanged() {
    this.address.pincode = this.f.address1.value;
    //this.address.city = this.f.address2.value;
  }

  onImageChanged(event) {

    this.cover = event.target.files[0];
    this.reader.readAsDataURL(event.target.files[0])
    console.log(this.reader);
    this.imgName = this.cover.name
  }


  //dummy
  signup_d() {
    //  console.log(this.register.value)
    //  console.log(this.register.value.address)
    //let ggs = this.register.value["address"] = {'address':this.register.value.address};
    console.log(JSON.stringify(this.register.value["address"] = { 'address': this.register.value.address }));

    this.http.post<any>("http://localhost:3000/register", this.register.value).subscribe(
      res => {
        this.ts.success('Account created Successfully')
        this.register.reset();
        this.router.navigate(['/login'])
      }
    ), error => {

      this.ts.warning('Error please try again')
      this.register.reset();
      // window.location.href = 'URL';
    }



  }

  //Email link login

  email(data){
    var link ="https://afj-staging-server.herokuapp.com/management/email/verification/?email_id="+data;
    this.as.email_link(link).subscribe(
      ele=>{
        if(ele.status === 200){
          // this.loaderbool = false;
          this.ts.info("Please check your email to login.")
          this.register.reset();
          this.router.navigate(['/admin/login'])
        }
      },
      error =>{
        console.log(error.statusText)
        this.ts.error(error.statusText)
      }
    )

  }

  //ordinary
  create() {
    this.submitted = true;

    //validation check
    if (this.register.invalid) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      this.ts.info("Kindly Fill Mandatory Details..!!")
      return;
  }
    this.loaderbool = true;
    let uploadData = new FormData();
    uploadData.append('first_name', this.f.first_name.value);
    // uploadData.append('last_name', this.f.last_name.value);
    uploadData.append('email_id', this.f.email_id.value);
    uploadData.append('phone_number', this.f.phone_number.value);
    this.onDesChanged();
    console.log(this.address);
    uploadData.append('address', JSON.stringify(this.address));
    uploadData.append('password', this.f.cpassword.value);
    // uploadData.append('profile_pic', this.cover);
console.log(uploadData)
    // uploadData.forEach((value, key) => {
    //   console.log(key + ":" + value)
    // });


    //this.as.register(`https://afj-staging-server.herokuapp.com/management/create/owner/`, uploadData)

    this.as.register(`https://afj-staging-server.herokuapp.com/management/create/owner/`, uploadData)
      .subscribe(
        ele => {
          for (let key in ele) {
            this.msg = ele[key];
    }
    if(ele.status === 201){
      this.loaderbool = false;
      this.email(uploadData.get('email_id'));
      this.ts.success("Owner Created Successfully")
      //this.router.navigate(['/login'])
      console.log(this.msg)
    }
    else if(ele.status === 206){
      console.log('pc check');
      for (let key in ele.body) {
        console.log(ele.body[key])
        var pc = ele.body[key]
      }
      console.log(pc)
      this.ts.info(pc)
    }   
          //alert(this.msg)
          console.log(this.msg)
          //this.ts.warning(this.msg)
          uploadData.forEach((value, key) => {
            console.log(key + ":" + value)
          });
          this.loaderbool = false;
          
          console.log(uploadData)
        }

        , error => {
          this.loaderbool = false;
          console.log(error)
          console.log(error.status)
          // for (let key in error.body) {
          //   console.log(error.body[key])
          //   var pcc = error.body[key]
          // }
          
          console.log(error.statusText)
          this.ts.error(error.statusText)
          //this.ts.error('Error, Please enter the details correctly!!')

          // window.location.href = 'URL';
        })

  }


  //reactive approach
  signup() {
    let ggs = JSON.stringify(this.register.value["address"] = { "address": this.register.value.address });
    console.log(this.register.value);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    this.http.post<any>("https://afj-staging-server.herokuapp.com/management/create/owner",
      this.register.value, httpOptions
      //  {
      //   first_name: this.f.first_name.value,
      //   last_name: this.f.last_name.value,
      //   email_id: this.f.email_id.value,
      //   phone_number: this.f.phone_number.value,
      //   address: this.f.address.value,
      //   password: this.f.password.value,
      //   profile_pic: this.f.profile_pic.value
      //  }
    ).subscribe(
      res => {
        this.ts.success('Account created Successfully')
        this.register.reset();
        this.router.navigate(['/login'])
      }
    ), error => {

      this.ts.error('Error please try again')
      this.register.reset();
      // window.location.href = 'URL';
    }
  }

}
