import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  text: string;
  name: string;
  title: string;
  image: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  private autoSwipeInterval: any;
  private swipeDuration = 7000;

  testimonials: Testimonial[] = [
    { text: '"Our experience with HR Taxi was outstanding! Their dedication and quality of service exceeded our expectations. Highly recommended!"', name: 'John Doe', title: 'CEO, Maitri Services', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { text: '"From start to finish, the team at HR Taxi was professional and efficient. They truly understand their clients\' needs and deliver exceptional results."', name: 'Jane Smith', title: 'Founder, Infinite Solutions', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { text: '"We saw a significant improvement after partnering with HR Taxi. Their innovative approach and support have been invaluable to our growth."', name: 'David Lee', title: 'Marketing Director, Global Enterprises', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { text: '"HR Taxi is a game-changer! Their punctual service and courteous drivers make commuting stress-free and reliable every single time."', name: 'Ryan Rai', title: 'Operations Manager, Everest Courier Services', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { text: '"Booking with HR Taxi was the best decision. Seamless experience from start to finish — professional, safe, and always on time."', name: 'Rajesh Hamal', title: 'Founder & CEO, Hamal Productions', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { text: '"I\'ve been using HR Taxi for months, and their drivers are always professional and friendly. The app is super easy to use!"', name: 'Sita Shrestha', title: 'HR Manager, NepalTech Solutions', image: 'https://randomuser.me/api/portraits/women/21.jpg' },
    { text: '"Reliable, affordable, and comfortable rides. HR Taxi has completely changed my daily commute for the better."', name: 'Anil Gurung', title: 'Software Engineer, Everest Innovations', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { text: '"Their customer service is exceptional. Whenever I had questions, they were quick to respond and resolve any issues."', name: 'Maya Koirala', title: 'Marketing Specialist, Himalayan Ventures', image: 'https://randomuser.me/api/portraits/women/45.jpg' },
    { text: '"HR Taxi provides safe and clean vehicles. Perfect for late-night travel around the city."', name: 'Binod Thapa', title: 'Business Consultant, Kathmandu Consulting', image: 'https://randomuser.me/api/portraits/men/56.jpg' }
  ];

  ngOnInit(): void {
    this.startAutoSwipe();
  }

  ngOnDestroy(): void {
    this.stopAutoSwipe();
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  private startAutoSwipe(): void {
    this.stopAutoSwipe();
    this.autoSwipeInterval = setInterval(() => this.next(), this.swipeDuration);
  }

  private stopAutoSwipe(): void {
    if (this.autoSwipeInterval) {
      clearInterval(this.autoSwipeInterval);
    }
  }
}
