import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  areasRow1 = ['Camberley', 'Blackwater', 'Frimley', 'Mytchett', 'AshVale', 'Farnbrough', 'Yateley', 'Sandhurst'];
  areasRow2 = ['Crowthorne', 'Lightwater', 'Bagshot', 'Windlesham', 'West End', 'Bisley', 'Aldershot'];

  scrollToBooking(): void {
    const el = document.getElementById('book-now');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
