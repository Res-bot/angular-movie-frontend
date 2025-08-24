import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './headerold.html',
  styleUrls: ['./headerold.css']
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
