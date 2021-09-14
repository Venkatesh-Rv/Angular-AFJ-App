import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HomepagesectionService } from './services/homepagesection.service';

import { AppRoutingModule } from './app-routing.module';
import { CurrencyPipe,CommonModule  } from '@angular/common';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { HeaderComponent } from './homepage/header/header.component';
import { FooterComponent } from './homepage/footer/footer.component';
import { NecklaceComponent } from './product/necklace/necklace.component';
import { CombosetsComponent } from './product/combosets/combosets.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product/product-page/product-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { ToastrModule } from 'ngx-toastr'
import { ButtonModule } from 'primeng/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductViewComponent } from './product-view/product-view.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HipchainComponent } from './product/hipchain/hipchain.component';
import { BridalsetsComponent } from './product/bridalsets/bridalsets.component';
import { ChokerComponent } from './product/choker/choker.component';
import { AnkletComponent } from './product/anklet/anklet.component';
import { BanglesComponent } from './product/bangles/bangles.component';
import { ChainsComponent } from './product/chains/chains.component';
import { RingsComponent } from './product/rings/rings.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { ToeRingComponent } from './product/toe-ring/toe-ring.component';
import { NoseRingComponent } from './product/nose-ring/nose-ring.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BannerUploadComponent } from './banner-upload/banner-upload.component';
import { BannerViewComponent } from './banner-view/banner-view.component';
import { HeaderDbComponent } from './core/header-db/header-db.component';
import { LoaderDbComponent } from './core/loader-db/loader-db.component';
import { ProductDbComponent } from './product-db/product-db.component';
import { PostService } from './services/post.service';
import { SucesslogginggService } from './services/sucessloggingg.service';
import { DbGuard } from './db.guard';
import { ContactusComponent } from './homepage/contactus/contactus.component';
import { TermsComponent } from './homepage/terms/terms.component';
import { PrivacypolicyComponent } from './homepage/privacypolicy/privacypolicy.component';
import { TrackComponent } from './homepage/track/track.component';
import { BulkordersComponent } from './homepage/bulkorders/bulkorders.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { DbLoginComponent } from './db-login/db-login.component';
import { DbRegisterComponent } from './db-register/db-register.component';



const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'policy', component: PrivacypolicyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'track', component: TrackComponent },
  { path: 'bulk', component: BulkordersComponent },
  { path: 'neck', component: NecklaceComponent },
  { path: 'comboset', component: CombosetsComponent },
  { path: 'hipchain', component: HipchainComponent },
  { path: 'bridal', component: BridalsetsComponent },
  { path: 'choker', component: ChokerComponent },
  { path: 'anklet', component: AnkletComponent },
  { path: 'bangles', component: BanglesComponent },
  { path: 'chains', component: ChainsComponent },
  { path: 'rings', component: RingsComponent },
  { path: 'toe-rings', component: ToeRingComponent},
  { path: 'nose-rings', component: NoseRingComponent },
  { path: 'prod-page', component: ProductPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product', component: ProductViewComponent },
  { path: 'search/:id', component: SearchresultComponent },
  { path: 'verify-email', component: EmailVerifyComponent },
  { path: 'details', component: ShippingDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'register', component: DbRegisterComponent },
  { path: 'login', component: DbLoginComponent },
  { path: 'ban-upload', component: BannerUploadComponent,canActivate:[DbGuard] },
  { path: 'ban-view', component: BannerViewComponent,canActivate:[DbGuard]},
  { path: 'add-prod', component: ProductDbComponent,canActivate:[DbGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    NecklaceComponent,
    CombosetsComponent,
    ShippingDetailsComponent,
    ProductPageComponent,
    ProductViewComponent,
    HipchainComponent,
    BridalsetsComponent,
    ChokerComponent,
    AnkletComponent,
    BanglesComponent,
    ChainsComponent,
    RingsComponent,
    SearchresultComponent,
    ToeRingComponent,
    NoseRingComponent,
    CartComponent,
    PaymentComponent,
    CheckoutComponent,
    BannerUploadComponent,
    BannerViewComponent,
    HeaderDbComponent,
    LoaderDbComponent,
    ProductDbComponent,
    ContactusComponent,
    TermsComponent,
    PrivacypolicyComponent,
    TrackComponent,
    BulkordersComponent,
    EmailVerifyComponent,
    DbLoginComponent,
    DbRegisterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule ,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' ,anchorScrolling:'enabled'}), //, { enableTracing: true }
    BrowserAnimationsModule,
    HttpClientModule,
    MatCarouselModule.forRoot(),
    CarouselModule,
    ButtonModule,
    NgbModule,
    FontAwesomeModule,
    MatSelectModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut:1500,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates:true
    }),
    MatInputModule,
    MatAutocompleteModule

  ],
  providers: [HomepagesectionService,
    CurrencyPipe,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  PostService,SucesslogginggService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
