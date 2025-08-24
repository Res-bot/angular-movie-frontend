import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

interface Banner {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  banners: Banner[] = [
    {
      image: "assets/images/tvd.png",
      title: "The Vampire Dairies",
      description: "A supernatural drama following Elena Gilbert and two vampire brothers, Damon and Stefan Salvatore, as they navigate love, friendship, and dark secrets in the town of Mystic Falls.",
    },
    {
      image: "assets/images/lucifer.png",
      title: "Lucifer",
      description: "Lucifer Morningstar, the Devil, abandons Hell to live in Los Angeles where he runs a nightclub and helps the LAPD solve crimes while struggling with his identity.",
    },
    {
      image: "assets/images/twilight.png",
      title: "The Twilight Saga",
      description: "A romantic fantasy series about Bella Swan, who falls in love with Edward Cullen, a vampire, leading to an epic love story filled with danger and supernatural rivalries.",
    },
    {
      image: "assets/images/ksbth.png",
      title: "Hissing Booth",
      description: "A teenage comedy where Elle Evans, a high school student, faces complications when she falls for her best friend’s older brother, Noah.",
    },
    {
      image: "assets/images/mlfsnt.png",
      title: "Maleficient: Mistress of Evil",
      description: "A fantasy adventure where Maleficent and her goddaughter Aurora face challenges when Aurora is set to marry Prince Phillip, unveiling a looming war between humans and fairies.",
    },
    {
      image: "assets/images/harry.png",
      title: "Harry Potter: Chamber of Secrets",
      description: "Harry Potter returns to Hogwarts for his second year, only to find the school plagued by mysterious attacks linked to a hidden chamber and a dark secret from the past.",
    },
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startSlider();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startSlider(): void {
    this.stopAutoSlide(); // clear old interval
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.banners.length;
    }, 5000); // every 5s
  }

  stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
    this.startSlider(); // restart auto slide after manual click
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.banners.length) % this.banners.length;
    this.startSlider(); // restart auto slide after manual click
  }
}
