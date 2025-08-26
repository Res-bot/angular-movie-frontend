import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type FaqItem = { question: string; expanded: boolean; randomLine: string };

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.css']
})
export class Faq {
  faqItems: FaqItem[] = [
    { question: 'How much does BingeIt cost?', expanded: false, randomLine: '' },
    { question: 'Where can I watch?', expanded: false, randomLine: '' },
    { question: 'How do I cancel?', expanded: false, randomLine: '' },
    { question: 'What can I watch on BingeIt?', expanded: false, randomLine: '' },
    { question: 'Is BingeIt good for kids?', expanded: false, randomLine: '' },
  ];

  private readonly randomLinesPool = [
    'Streaming made simple. Enjoy your show!',
    'New features arrive every week—stay tuned!',
    'Tip: Download to watch offline anytime.',
    'Profiles keep your recommendations personal.',
    'Parental controls help you manage content.',
    'Try searching by genre to discover more.',
    'Your next favorite is one click away.',
  ];

  toggleFaq(item: FaqItem, event?: MouseEvent) {
    event?.preventDefault();
    item.expanded = !item.expanded;
    if (item.expanded && !item.randomLine) {
      const i = Math.floor(Math.random() * this.randomLinesPool.length);
      item.randomLine = this.randomLinesPool[i];
    }
  }

  trackByIndex(i: number) { return i; }
}