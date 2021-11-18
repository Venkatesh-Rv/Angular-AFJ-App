import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-success-page',
  templateUrl: './reset-success-page.component.html',
  styleUrls: ['./reset-success-page.component.css']
})
export class ResetSuccessPageComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.route.navigate(['/admin/login'])
  }, 4000);
  }

}
