import { Component, Input, OnInit } from '@angular/core';
import { Filter } from '../interfaces';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {
  @Input()
  filter?: Filter | undefined;

  typesOfBaggage: 'carry-on' | 'checked' = 'carry-on';
  seats = {
  	totalRows: 31,
	  seatsPerRow: 6,
	  seatNaming:'rowType',
	  // booked:['1A','5D']
  };

  getSelected(event: number){
    console.log(event)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
