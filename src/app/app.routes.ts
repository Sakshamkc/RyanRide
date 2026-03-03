import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ThankYouComponent } from './pages/thank-you.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: '**', redirectTo: '' }
];
