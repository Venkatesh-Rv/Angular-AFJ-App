import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';
import { PwdValidator } from '../pwd-validator';

@Component({
  selector: 'app-db-register',
  templateUrl: './db-register.component.html',
  styleUrls: ['./db-register.component.css']
})
export class DbRegisterComponent implements OnInit {

  public register:FormGroup;
  loaderbool: boolean = false;
  address: any = {};
  cover: File;
  reader = new FileReader();
  imgName: string = 'Upload Image'
  
  

  constructor(private fb:FormBuilder, private http:HttpClient,private router:Router,private ts:ToastrService,
    private as:AuthService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      first_name:[""],
      last_name:[""],
      email_id:[""],
      phone_number:[""],
      address:[""],
      password:[""],
      profile_pic:"null"
    }
    );

    ///test
    this.http.get<any>("https://afj-staging-server.herokuapp.com/management/head_start/").subscribe(res=>{
      console.log(res)
    })
    
  }

  get f() { return this.register.controls; }

  onDesChanged() {
    this.address.city = this.f.address.value;
  }

  onImageChanged(event) {
    
    this.cover = event.target.files[0];
    this.reader.readAsDataURL(event.target.files[0])
    console.log(this.reader);
    this.imgName = this.cover.name
  }

  signup_d(){
  //  console.log(this.register.value)
  //  console.log(this.register.value.address)
   //let ggs = this.register.value["address"] = {'address':this.register.value.address};
   console.log(JSON.stringify(this.register.value["address"] = {'address':this.register.value.address}));
   
    this.http.post<any>("http://localhost:3000/register",this.register.value).subscribe(
      res=>{
        this.ts.success('Account created Successfully')
        this.register.reset();
        this.router.navigate(['/login'])
      }
    ),error => {
     
      this.ts.warning('Error please try again')
      this.register.reset();
      // window.location.href = 'URL';
      }

    

  }


  //ordinary

  create() {
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

    this.as.register(`https://afj-staging-server.herokuapp.com/management/create/owner/`, uploadData)
    .subscribe(
      ele =>{ 
        this.ts.success("Account Created Successfully")
        console.log(uploadData)
        this.router.navigate(['/login'])
    // window.location.reload();
  }
    
    ,error => {
      this.loaderbool=false;
      this.ts.error('Error, Please enter the details correctly!!')
      
      // window.location.href = 'URL';
      })

  }


  //reactive approach
  signup(){
   let ggs = JSON.stringify(this.register.value["address"] = {"address":this.register.value.address});
   console.log(this.register.value);
   const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
   
   this.http.post<any>("https://afj-staging-server.herokuapp.com/management/create/owner",
   this.register.value,httpOptions
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
     res=>{
       this.ts.success('Account created Successfully')
       this.register.reset();
       this.router.navigate(['/login'])
     }
   ),error => {
    
     this.ts.error('Error please try again')
     this.register.reset();
     // window.location.href = 'URL';
     }
   }

}
