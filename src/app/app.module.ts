import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'neck', component: NecklaceComponent },
  { path: 'comboset', component: CombosetsComponent },
  { path: 'prod-page', component: ProductPageComponent },
  { path: 'details', component: ShippingDetailsComponent },
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
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
