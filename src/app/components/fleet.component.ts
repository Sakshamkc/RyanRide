import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.scss'
})
export class FleetComponent {
  vehicles = [
    {
      name: 'Executive – Travel in Luxury',
      image: 'assets/images/executive.webp',
      passengers: 4,
      luggage: 2,
      handBags: 2
    },
    {
      name: 'Minibus – For Large Groups & Extra Luggage',
      image: 'assets/images/Minibus.webp',
      passengers: 8,
      luggage: 8,
      handBags: 8
    },
    {
      name: 'Saloon – Classic & Comfortable',
      image: 'assets/images/saloon.jpg',
      passengers: 4,
      luggage: 2,
      handBags: 2
    }
  ];
}
