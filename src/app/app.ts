import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
// import { Trend } from "./trend/trend";
// import { Release } from "./release/release";
import { Trends } from "./trends/trends";
// import { Happy } from './happy/happy';


// import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [Header, Footer, Trends],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angprcproj';

  //  boxColor = 'red';
  // changeToRed() {
  //   this.boxColor = 'red';
  // }
  // changeToBlue() {
  //   this.boxColor = 'blue';
  // }

  // variable: string = "hello";

  // items : string[] =[]

}
