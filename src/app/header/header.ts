import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports:[CommonModule]
})
export class HeaderComponent {
  isMenuOpen = false;
  isSearchActive = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleSearch(): void {
    this.isSearchActive = !this.isSearchActive;
  }

}
