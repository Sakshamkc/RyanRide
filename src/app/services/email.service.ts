import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private serviceId = 'service_i2n9bqa';
  private bookingTemplateId = 'template_kfub3tp';
  private newsletterTemplateId = 'template_lqrwjza';

  constructor() {
    emailjs.init('OkR6Uv_1oi2Q7GWUW');
  }

  sendBooking(data: Record<string, string>): Promise<any> {
    return emailjs.send(this.serviceId, this.bookingTemplateId, data);
  }

  sendNewsletter(form: HTMLFormElement): Promise<any> {
    return emailjs.sendForm(this.serviceId, this.newsletterTemplateId, form);
  }
}
