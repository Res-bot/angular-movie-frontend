import { Component } from '@angular/core';
import {  AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-trends',
  imports: [],
  templateUrl: './trends.html',
  styleUrl: './trends.css'
})
export class Trends {
  private currentIndex = 0;
  private track!: HTMLElement;
  private items!: NodeListOf<HTMLElement>;
  private prevBtn!: HTMLElement;
  private nextBtn!: HTMLElement;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.track = document.getElementById('carouselTrack') as HTMLElement;
    this.items = this.track.querySelectorAll('.carousel-item');
    this.prevBtn = document.getElementById('prevBtn') as HTMLElement;
    this.nextBtn = document.getElementById('nextBtn') as HTMLElement;

    this.updateButtons();

    if (this.prevBtn) {
      this.renderer.listen(this.prevBtn, 'click', () => this.move(-1));
    }
    if (this.nextBtn) {
      this.renderer.listen(this.nextBtn, 'click', () => this.move(1));
    }
  }

  move(direction: number): void {
    const visibleItems = this.getVisibleItems();
    const maxIndex = this.items.length - visibleItems;

    this.currentIndex += direction;
    if (this.currentIndex < 0) this.currentIndex = 0;
    if (this.currentIndex > maxIndex) this.currentIndex = maxIndex;

    const itemWidth = this.items[0].offsetWidth + 24; // matches CSS gap
    const translateX = -(this.currentIndex * itemWidth);

    this.track.style.transform = `translateX(${translateX}px)`;
    this.updateButtons();
  }

  getVisibleItems(): number {
    const width = window.innerWidth;
    if (width <= 400) return 1;
    if (width <= 600) return 2;
    if (width <= 900) return 3;
    if (width <= 1200) return 4;
    return 5;
  }

  updateButtons(): void {
    const visibleItems = this.getVisibleItems();
    const maxIndex = this.items.length - visibleItems;

    if (this.currentIndex === 0) {
      this.prevBtn?.classList.add('nav-disabled');
    } else {
      this.prevBtn?.classList.remove('nav-disabled');
    }

    if (this.currentIndex >= maxIndex) {
      this.nextBtn?.classList.add('nav-disabled');
    } else {
      this.nextBtn?.classList.remove('nav-disabled');
    }
  }
}
