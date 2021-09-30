import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-db-reset-pwd',
  templateUrl: './db-reset-pwd.component.html',
  styleUrls: ['./db-reset-pwd.component.css']
})
export class DbResetPwdComponent implements OnInit {

  Pwdform : FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

    this.Pwdform = this.fb.group({
      passwordc:["",Validators.required,Validators.minLength(8)],
      password:["",Validators.required,Validators.minLength(8)],
    });
      
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : true;
}

}
