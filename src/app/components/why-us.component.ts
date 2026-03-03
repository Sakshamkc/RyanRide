import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss'
})
export class WhyUsComponent {
  features = [
    { icon: 'fas fa-stopwatch', title: 'Punctual & Reliable', text: 'We value your time. Our drivers arrive on time, every time — guaranteed!' },
    { icon: 'fas fa-car-side', title: 'Modern & Clean Vehicles', text: 'Enjoy your ride in our well-maintained, clean, and comfortable fleet.' },
    { icon: 'fas fa-user-shield', title: 'Safe & Secure', text: 'Your safety is our top priority — background-checked drivers & GPS-tracked rides.' }
  ];
}
