import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import Swal from 'sweetalert2';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent implements OnInit, AfterViewInit {
  serviceType = '';
  submitting = false;

  // City / Work / Long Distance form
  cityForm!: FormGroup;
  // Airport Pickup form
  airportPickupForm!: FormGroup;
  // Airport Dropoff form
  airportDropoffForm!: FormGroup;

  airports = [
    'London Gatwick Airport (LGW)',
    'London Heathrow Airport (LHR)',
    'London Stansted Airport (STN)',
    'London Luton Airport (LTN)'
  ];

  vehicles = ['Saloon', 'Executive', 'Mini Bus (8 Seater)'];

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cityForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: [''],
      vehicleType: [''],
      pickupLocation: ['', Validators.required],
      destination: ['', Validators.required],
      passengerCount: [null],
      luggageCount: [null],
      needReturnJourney: [false],
      pickupDate: [''],
      pickupTime: [''],
      specialInstructions: ['']
    });

    this.airportPickupForm = this.fb.group({
      airportName: ['', Validators.required],
      airportTerminal: [''],
      flightNumber: ['', Validators.required],
      arrivingFrom: [''],
      pickMeAfter: [''],
      dropoffAddress: ['', Validators.required],
      doorNo: [''],
      pickupDate: [''],
      pickupTime: [''],
      airportPassengerName: ['', Validators.required],
      airportContact: ['', Validators.required],
      airportEmail: [''],
      airportVehicle: [''],
      airportPassengers: [1],
      airportSmallLuggage: [null],
      airportLargeLuggage: [null],
      specialInstructions: ['']
    });

    this.airportDropoffForm = this.fb.group({
      dropoffAirport: ['', Validators.required],
      dropoffTerminal: ['', Validators.required],
      dropoffPickupAddress: ['', Validators.required],
      dropoffPickupTime: ['', Validators.required],
      dropoffDoorNo: [''],
      dropoffPassengerName: ['', Validators.required],
      dropoffContact: ['', Validators.required],
      dropoffEmail: [''],
      dropoffVehicle: [''],
      dropoffPassengers: [1],
      dropoffSmallLuggage: [null],
      dropoffLargeLuggage: [null]
    });
  }

  ngAfterViewInit(): void {
    this.initFlatpickr();
  }

  private initFlatpickr(): void {
    setTimeout(() => {
      const dateEl = document.getElementById('pickupDate');
      const timeEl = document.getElementById('pickupTime');
      const dropoffTimeEl = document.getElementById('dropoffPickupTime');

      if (dateEl) {
        flatpickr(dateEl, { dateFormat: 'Y-m-d', minDate: 'today' });
      }
      if (timeEl) {
        flatpickr(timeEl, { enableTime: true, noCalendar: true, dateFormat: 'H:i', time_24hr: true });
      }
      if (dropoffTimeEl) {
        flatpickr(dropoffTimeEl, { enableTime: true, noCalendar: true, dateFormat: 'h:i K', time_24hr: false });
      }
    }, 100);
  }

  onServiceChange(): void {
    // Re-init flatpickr when switching forms
    setTimeout(() => this.initFlatpickr(), 50);
  }

  get isCityType(): boolean {
    return this.serviceType === 'Local Transfers' ||
           this.serviceType === 'Work Transfers' ||
           this.serviceType === 'Long Distance' ||
           this.serviceType === '';
  }

  get isAirportPickup(): boolean {
    return this.serviceType === 'Airport Transfer/Pickup';
  }

  get isAirportDropoff(): boolean {
    return this.serviceType === 'Airport Transfer/Drop off';
  }

  async onSubmit(): Promise<void> {
    this.submitting = true;
    let data: Record<string, string> = { serviceType: this.serviceType };

    try {
      if (this.isAirportPickup) {
        const v = this.airportPickupForm.value;
        data = {
          ...data,
          airportName: v.airportName,
          terminal: v.airportTerminal,
          flightNumber: v.flightNumber,
          arrivingFrom: v.arrivingFrom,
          pickMeAfter: v.pickMeAfter,
          dropoffAddress: v.dropoffAddress,
          doorNo: v.doorNo,
          pickupDate: v.pickupDate,
          pickupTime: v.pickupTime,
          passengerName: v.airportPassengerName,
          email: v.airportEmail,
          phoneNumber: v.airportContact,
          vehicleType: v.airportVehicle,
          passengerCount: v.airportPassengers?.toString() || '',
          smallLuggage: v.airportSmallLuggage?.toString() || '',
          largeLuggage: v.airportLargeLuggage?.toString() || '',
          specialInstructions: v.specialInstructions
        };
      } else if (this.isAirportDropoff) {
        const v = this.airportDropoffForm.value;
        data = {
          ...data,
          airportName: v.dropoffAirport,
          terminal: v.dropoffTerminal,
          pickupTime: v.dropoffPickupTime,
          pickupAddress: v.dropoffPickupAddress,
          doorNo: v.dropoffDoorNo,
          passengerName: v.dropoffPassengerName,
          email: v.dropoffEmail,
          phoneNumber: v.dropoffContact,
          vehicleType: v.dropoffVehicle,
          passengerCount: v.dropoffPassengers?.toString() || '',
          smallLuggage: v.dropoffSmallLuggage?.toString() || '',
          largeLuggage: v.dropoffLargeLuggage?.toString() || ''
        };
      } else {
        const v = this.cityForm.value;
        data = {
          ...data,
          fullName: v.fullName,
          phoneNumber: v.phoneNumber,
          email: v.email,
          pickupLocation: v.pickupLocation?.trim() || '',
          destination: v.destination?.trim() || '',
          pickupDate: v.pickupDate,
          pickupTime: v.pickupTime,
          passengerCount: v.passengerCount?.toString() || '',
          luggageCount: v.luggageCount?.toString() || '',
          vehicleType: v.vehicleType,
          specialInstructions: v.specialInstructions,
          needReturnJourney: v.needReturnJourney ? 'Yes' : 'No'
        };
      }

      await this.emailService.sendBooking(data);
      this.router.navigate(['/thank-you']);
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: `Error submitting booking: ${error.message}` });
    }

    this.submitting = false;
  }
}
