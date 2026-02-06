import { Routes } from '@angular/router';
import {NotFoundComponent} from './not-found.component/not-found.component';
import {HomeComponent} from './home.component/home.component';
import {PassengerDashboardComponent} from './passenger-dashboard/containers/passenger-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'passengers', component: PassengerDashboardComponent, pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }
];
