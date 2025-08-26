import { Component } from '@angular/core';
import { Banner } from './banner/banner';
import { HeaderComponent } from './header/header';
import { Trends } from './trends/trends';
import { Faq } from './faq/faq';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,  Banner, HeaderComponent, Trends, Faq],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
