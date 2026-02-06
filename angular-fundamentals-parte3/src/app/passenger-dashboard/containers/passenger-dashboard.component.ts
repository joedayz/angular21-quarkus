import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Passenger} from '../models/passenger.interface';
import {PassengerDashboardService} from '../services/passenger-dashboard.service';
import {PassengerCountComponent} from '../components/passsenger-count.component';
import {PassengerDetailComponent} from '../components/passenger-detail.component';



@Component({
  selector: 'passenger-dashboard',
  standalone: true,
  template: `
    <div class="app">
      <passenger-count [items]="passengers"></passenger-count>
      @for (passenger of passengers; track passenger.id) {
        <passenger-detail [detail]="passenger"
                          (edit)="handleEdit($event)"
                          (remove)="handleRemove($event)"></passenger-detail>
      }

    </div>
  `,
  imports: [
    PassengerCountComponent,
    PassengerDetailComponent

  ]
})
export class PassengerDashboardComponent implements OnInit {


  passengers: Passenger[] = [];

  constructor(private passengerService: PassengerDashboardService,
              private cdr: ChangeDetectorRef) {

  }


  ngOnInit(): void {
    this.passengerService.getPassengers().subscribe(
      (passengers: Passenger[]) => {
        this.passengers = passengers;
        this.cdr.detectChanges();
      }
    )

  }


  protected handleEdit(event: Passenger) {
    this.passengerService.updatePassenger(event).subscribe(
      () => this.passengers = this.passengers.map(passenger =>
        passenger.id === event.id ? {...passenger, ...event} : passenger
      )
    );
  }

  protected handleRemove(passenger: Passenger) {
    this.passengerService.removePassenger(passenger).subscribe(
      () =>
        this.passengers = this.passengers.filter(p => p.id !== passenger.id));
  }
}
