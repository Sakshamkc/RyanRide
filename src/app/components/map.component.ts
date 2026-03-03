import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `
    <div class="container my-4">
      <div style="width: 100%; height: 400px; border-radius: 8px; overflow: hidden; box-shadow: 0 0 8px rgba(0,0,0,0.15)">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.2325636687677!2d-0.7492894844009388!3d51.3271117796237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760f157224da8f%3A0xa6a84e9b124b7e14!2sCamberley%2C%20Surrey%2C%20UK!5e0!3m2!1sen!2suk!4v1691790000000!5m2!1sen!2suk"
          width="100%" height="100%" style="border: 0" allowfullscreen loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  `
})
export class MapComponent {}
