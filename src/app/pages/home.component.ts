import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero.component';
import { BookingFormComponent } from '../components/booking-form.component';
import { AboutComponent } from '../components/about.component';
import { ServicesComponent } from '../components/services.component';
import { FleetComponent } from '../components/fleet.component';
import { WhyUsComponent } from '../components/why-us.component';
import { TestimonialsComponent } from '../components/testimonials.component';
import { MapComponent } from '../components/map.component';
import { FooterComponent } from '../components/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    BookingFormComponent,
    AboutComponent,
    ServicesComponent,
    FleetComponent,
    WhyUsComponent,
    TestimonialsComponent,
    MapComponent,
    FooterComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-booking-form></app-booking-form>
    <app-about></app-about>
    <app-services></app-services>
    <app-fleet></app-fleet>
    <app-why-us></app-why-us>
    <app-testimonials></app-testimonials>
    <app-map></app-map>
    <app-footer></app-footer>
  `
})
export class HomeComponent {}
