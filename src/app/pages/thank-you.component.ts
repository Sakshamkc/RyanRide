import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

declare function gtag(...args: any[]): void;

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent implements OnInit {
  ngOnInit(): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', { send_to: 'AW-17573246746/VWf_CI3iwqwbEJruybtB' });
    }
  }
}
