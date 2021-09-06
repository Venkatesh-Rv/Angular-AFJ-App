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

  slides = [
  { "name": "Necklace",
    "image": "../../../assets/images/AFJ- Images/neck.jpg",
    "url":"neck"
  },
  { "name": "Combo Sets",
  "image": "../../../assets/images/AFJ- Images/combo.jpg",
  "url":"comboset"
},
{ "name": "Choker",
"image": "../../../assets/images/AFJ- Images/choker.jpg",
"url":"choker"
},
{ "name": "Bridal Sets",
"image": "../../../assets/images/AFJ- Images/haram.jpg",
"url":"bridal"
},
];

// slides = [
//   { "name": "Necklace",
//     "image": "assets/images/AFJ-Images/neck.jpg",
//     "url":"neck"
//   },
//   { "name": "Combo Sets",
//   "image": ".assets/images/AFJ-Images/combo.jpg",
//   "url":"comboset"
// },
// { "name": "Choker",
// "image": "assets/images/AFJ-Images/choker.jpg",
// "url":"choker"
// },
// { "name": "Bridal Sets",
// "image": "assets/images/AFJ-Images/haram.jpg",
// "url":"bridal"
// },
// ];
 
 
  //  //code ends here

  //slider setting variable
  responsiveOptions: any;

  //define validable to store dynamic products data(product slider)
  products: any;

  //
  necklace:any;
  combosets:any;
  hipchain:any;
  bridalsets:any;
  choker:any;

  endpoint_necklace ='necklace/';


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
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '414px',
        numVisible: 2,
        numScroll: 1
      }
    ];

    //get request for product slider
    this.http.get('http://localhost:3000/posts').subscribe(data => {
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
    // let ses_prod= this.products;
    // // console.log(ses_prod)
    // sessionStorage.setItem('session_testing',JSON.stringify(ses_prod));
    // console.log('The session data is:' +sessionStorage.getItem('session_testing'));
    this.hpNecklace();
    this.hpCombosets();
    //this.hpHipchain();
  }

  btnClick(url) {
    console.log(url)
    this.router.navigateByUrl('/'+url)
  }

  dummy: any = [];

  private working(){
    console.log(this.products)
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

  private hpNecklace(){
    this.Homepagesection.homeSection('necklace').subscribe(data => {
      //data storing for use in html component
      this.necklace = data;
    }, error => console.error(error));

  }

  private hpCombosets(){
    this.Homepagesection.homeSection('combo-sets').subscribe(data => {
      //data storing for use in html component
      this.combosets = data;
    }, error => console.error(error));

  }

  private hpHipchain(){
    this.Homepagesection.homeSection('hipchain').subscribe(data => {
      //data storing for use in html component
      this.hipchain = data;
    }, error => console.error(error));

  }

  nav(id,getval){
    this.router.navigate(['/product'], { queryParams: { cat: getval,id } });
  }



}






