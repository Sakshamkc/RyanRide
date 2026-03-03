import { Component } from '@angular/core';

declare function gtag(...args: any[]): void;

@Component({
  selector: 'app-floating-buttons',
  standalone: true,
  template: `
    <a href="https://wa.me/+447447820040?text=Hello%2C%20I%20would%20like%20to%20book%20a%20taxi."
       class="whatsapp-float" target="_blank" style="text-decoration: none">
      <i class="fab fa-whatsapp"></i>
    </a>
    <a href="tel:+447447820040" class="call-float" target="_blank"
       style="text-decoration: none" (click)="trackPhoneClick()">
      <i class="fas fa-phone"></i>
    </a>
  `
})
export class FloatingButtonsComponent {
  trackPhoneClick(): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', { send_to: 'AW-17573246746/i3U1CPv2wqwbEJruybtB' });
    }
  }
}
