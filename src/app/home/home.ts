import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { Banner } from '../banner/banner';
import { Trends } from '../trends/trends';
import { Faq } from '../faq/faq';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, Banner, Trends, Faq],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
 
}
