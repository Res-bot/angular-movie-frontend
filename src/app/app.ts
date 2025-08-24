import { Component, signal } from '@angular/core';
import { Footer } from "./footer/footer";
import { HeaderComponent } from "./header/header";
import { Home } from "./home/home";
import { Trends } from "./trends/trends";


@Component({
  selector: 'app-root',
  imports: [Footer, HeaderComponent, Home, Trends],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
