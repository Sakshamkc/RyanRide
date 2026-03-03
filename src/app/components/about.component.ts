import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  scrollToBooking(): void {
    const el = document.getElementById('book-now');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
