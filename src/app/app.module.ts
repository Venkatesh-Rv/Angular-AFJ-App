import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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



const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'neck', component: NecklaceComponent },
  { path: 'comboset', component: CombosetsComponent },
  { path: 'prod-page', component: ProductPageComponent },
  { path: 'details', component: ShippingDetailsComponent },
  { path: 'product/:id', component: ProductViewComponent },
  { path: 'search/:id', component: SearchresultComponent }
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
    SearchresultComponent
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
    MatInputModule,
    MatAutocompleteModule

  ],
  providers: [HomepagesectionService,
    CurrencyPipe],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
