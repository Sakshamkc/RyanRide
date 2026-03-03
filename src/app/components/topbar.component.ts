import { Component } from '@angular/core';

declare function gtag(...args: any[]): void;

@Component({
  selector: 'app-topbar',
  standalone: true,
  template: `
    <div class="bg-dark text-white py-1 small border-bottom border-secondary">
      <div class="d-flex justify-content-center align-items-center gap-5">
        <div class="d-flex align-items-center">
          <i class="fas fa-envelope me-2"></i>
          <a href="mailto:booking&#64;hrtaxi.co.uk" class="text-white text-decoration-none fw-bold fs-6">
            booking&#64;hrtaxi.co.uk
          </a>
        </div>
        <div class="d-flex align-items-center">
          <i class="fas fa-phone-alt me-2"></i>
          <a href="tel:+447447820040" class="text-white text-decoration-none fw-bold fs-6"
             (click)="trackPhoneClick()">
            +44 7447 820040
          </a>
        </div>
      </div>
    </div>
  `
})
export class TopbarComponent {
  trackPhoneClick(): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', { send_to: 'AW-17573246746/i3U1CPv2wqwbEJruybtB' });
    }
  }
}
