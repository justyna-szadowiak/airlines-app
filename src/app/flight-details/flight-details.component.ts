import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Airport, Flight, Journey, PassangersCount, Ticket } from '../interfaces';
import { LogInComponent } from '../log-in/log-in.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent {
  @Input() flight: Flight | undefined | null;
  @Input() journey: Journey | undefined | null;
  @Input() departure: Airport | undefined | null;
  @Input() destination: Airport | undefined | null;
  @Input() passangersCount: PassangersCount | any;
  @Output() ticketSubmit: EventEmitter<Ticket> = new EventEmitter()

  public typesOfBaggage: 'carry-on' | 'checked' = 'carry-on';

  public seats: string[] = [];

  constructor(public dialog: MatDialog) { }

  public onSeatsChange(seats: string[]) {
    this.seats = seats;
  }

  public submit(){

    const dialogRef = this.dialog.open(LogInComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(() => {
      const ticket: Ticket = {
        from: this.departure?.airport,
        to: this.destination?.airport,
        flightDate: this.flight?.date,
        adults: this.passangersCount.adults,
        children: this.passangersCount.children,
        typesOfBaggage: this.typesOfBaggage,
        seats: this.seats,
        price: this.flight?.price
      }

      this.ticketSubmit.emit(ticket);
    });
  }
}
