import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trend',
  imports: [],
  templateUrl: './trend.html',
  styleUrl: './trend.css'
})
export class Trend {
    constructor(private router: Router) {}

  openMovie(movieId: string) {
    console.log("Clicked movie:", movieId);
    // later you can navigate to a detail page
    // this.router.navigate(['/movie', movieId]);
  }

  openCast(castId: string) {
    console.log("Clicked cast:", castId);
    // later you can navigate to a cast detail page
    // this.router.navigate(['/cast', castId]);
  }
}
