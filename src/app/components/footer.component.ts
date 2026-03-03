import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailService } from '../services/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @ViewChild('subscribeForm') subscribeFormRef!: ElementRef<HTMLFormElement>;

  quickLinks = [
    { label: 'Home', fragment: 'home' },
    { label: 'About Us', fragment: 'about' },
    { label: 'Services', fragment: 'services' },
    { label: 'Our Fleet', fragment: 'fleet' },
    { label: 'Features', fragment: 'why-us' },
    { label: 'Testimonials', fragment: 'testimonials' },
    { label: 'Contact', fragment: 'contact' }
  ];

  constructor(private emailService: EmailService) {}

  scrollTo(fragment: string, event: Event): void {
    event.preventDefault();
    const el = document.getElementById(fragment);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  async onSubscribe(event: Event): Promise<void> {
    event.preventDefault();
    const form = this.subscribeFormRef.nativeElement;
    try {
      await this.emailService.sendNewsletter(form);
      Swal.fire({ icon: 'success', title: 'Subscribed!', text: 'Thank you for subscribing to our newsletter.' });
      form.reset();
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Subscription Failed', text: `Error: ${error.message}` });
      form.reset();
    }
  }
}
