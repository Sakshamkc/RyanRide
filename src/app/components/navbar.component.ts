import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  activeSection = 'home';
  isCollapsed = true;

  navLinks = [
    { label: 'Home', fragment: 'home' },
    { label: 'About Us', fragment: 'about' },
    { label: 'Services', fragment: 'services' },
    { label: 'Our Fleet', fragment: 'fleet' },
    { label: 'Features', fragment: 'why-us' },
    { label: 'Testimonials', fragment: 'testimonials' },
    { label: 'Contact Us', fragment: 'book-now' }
  ];

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach((section: Element) => {
      const el = section as HTMLElement;
      if (window.scrollY >= el.offsetTop - 100) {
        current = el.getAttribute('id') || '';
      }
    });
    if (current) {
      this.activeSection = current;
    }
  }

  scrollTo(fragment: string): void {
    this.isCollapsed = true;
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleNav(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
