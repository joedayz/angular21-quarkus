import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Passenger} from '../models/passenger.interface';
import {DatePipe, UpperCasePipe} from '@angular/common';

@Component({
    selector: 'passenger-detail',
    standalone: true,
    imports: [
      DatePipe,
      UpperCasePipe
    ],
    template: `
      <div>
        <span class="status"
              [class.checked-in]="detail.checkedIn"
              [class.checked-out]="!detail.checkedIn">
        </span>

        @if (editing) {
          <div>
            <input
              type="text"
              [value]="detail.fullname"
              (input)="onNameChange(name.value)"
              #name>
          </div>
        } @else {
          <div>
            {{ detail.fullname }}
          </div>
        }

        <div class="date">
          Check in date:
          {{ detail.checkInDate ? (detail.checkInDate | date: 'yMMMMd' | uppercase) : 'Not checked in yet' }}
        </div>
        <div class="children">
          Children: {{ detail.children?.length || 0 }}
        </div>

        <button (click)="handleEdit()">
          {{ editing ? 'Done': 'Edit'}}
        </button>
        <button (click)="onRemove()">
          Remove
        </button>
      </div>


    `,
    styleUrls: ['./passenger-detail.component.css'],
  }
)
export class PassengerDetailComponent {
  @Input()
  detail!: Passenger;

  @Output()
  edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()
  remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  editing: boolean = false;

  protected onNameChange(value: string) {
    this.detail.fullname = value;
  }

  protected handleEdit() {
    if(this.editing){
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }

  protected onRemove() {
    this.remove.emit(this.detail);
  }
}
