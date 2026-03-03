import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services = [
    {
      title: 'City Travels',
      description: 'Convenient transportation for local tours, whether it is a shopping journey, a night out, or a sightseeing tour.',
      image: 'assets/images/paris-4546007_1280.jpg'
    },
    {
      title: 'Airport Transfers',
      description: 'Hassle-free transfers to and from all primary UK airports. Enjoy a stress-free journey with timely pickups and drop-offs.',
      image: 'assets/images/airport-transfers.webp'
    },
    {
      title: 'Corporate Travels',
      description: 'Professional and discreet transportation for business meetings, occasions, and corporate clients. Arrive in style.',
      image: 'assets/images/corporate-travel.jpg'
    }
  ];

  areas = '• Camberley • Blackwater • Frimley • Mytchett • Ash Vale • Farnborough • Yateley • Sandhurst • Crowthorne • Lightwater • Bagshot • Windlesham • West End • Bisley • Aldershot';
}
