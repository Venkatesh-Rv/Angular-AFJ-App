import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class SucesslogginggService {

  constructor(private toaster: ToastrService, private route: Router) { }


  SuccessLog(ResponseData, navigateUrl) {


    if (ResponseData) {

      this.toaster.success('Your data has been recorded sucessfully', 'Sucess', {
        timeOut: 3000,
      });

      setTimeout(() => {

        this.route.navigate([`/${navigateUrl}`])


      }, 5000)


    } 

  }



}
