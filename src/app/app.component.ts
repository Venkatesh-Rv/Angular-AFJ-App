import { Component,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'AFJ-App';
  public phone = "THE PHONE NUMBER IN INTERNATIONAL FORMAT WITHOUT THE PLUS SIGN"
  public msg = "THE PRESET MESSAGE TO SEND";
}
