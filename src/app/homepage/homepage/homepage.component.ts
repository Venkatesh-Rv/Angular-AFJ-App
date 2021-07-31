import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HomepagesectionService } from 'src/app/services/homepagesection.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  slides = [{ 'image': 'https://therichpost.com/wp-content/uploads/2021/02/Vuejs-Fashion-Ecommerce-Template-Free.png' },
  { 'image': 'https://media.gettyimages.com/photos/jewelry-picture-id118199633?s=2048x2048' },
  { 'image': 'https://therichpost.com/wp-content/uploads/2020/10/Angular-10-Learning-Education-Center-Free-Template-1.png' },
  { 'image': 'https://therichpost.com/wp-content/uploads/2020/11/Reactjs-Easy-Shop-Free-Template-with-Source-Code.png' },
  { 'image': 'https://therichpost.com/wp-content/uploads/2021/02/angular-11-bootstrap-4.5-Ecommerce-Template-Free.png' }];
  //  //code ends here

  //slider setting variable
  responsiveOptions: any;

  //define validable to store dynamic products data
  products: any;


  constructor(private http: HttpClient, private router: Router, private Homepagesection: HomepagesectionService) {
    //slider responsive settings
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '414px',
        numVisible: 3,
        numScroll: 1
      }
    ];

    //get request
    this.http.get('https://www.testjsonapi.com/products/').subscribe(data => {
      //data storing for use in html component
      this.products = data;
    }, error => console.error(error));

    // banner images
    this.Homepagesection.getHomeBanner('product/banner/get/all/record/').subscribe(ele => {
      
      console.log(ele);
      this.topImageSeprator(ele)

    })
  }

  ngOnInit(): void {
    this.getImage;
    this.working();
  }

  btnClick() {
    this.router.navigate(['prod-page'])
  }

  dummy: any = [];

  private working(){
    console.log(typeof(this.products))
  }
  private getImage() {
    // this.Homepagesection.getHomeBanner('product/banner/get/all/record/').subscribe(ele => {
      
    //   console.log(ele);
    //   this.topImageSeprator(ele)

    // })
  }

  private topImageSeprator(TopItems) {


    for (const i of TopItems.success) {

      console.log(i.banner_image);
      if (i.category === 'Cosmetics') {
        const objNew: any = { image: i.image_url };

        this.dummy.push(objNew)
        // console.log(this.dummy)
      }
      else {
        const objNew: any = { image: i.image_url, name: i.name };

        // this.newdummy.push(objNew)
        // console.log(this.newdummy)
        // console.log(this.dummy)
      }

    }
  }

  



}






