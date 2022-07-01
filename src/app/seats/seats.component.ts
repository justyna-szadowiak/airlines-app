import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Seat } from '../interfaces';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {
  @Input() set count(value: number) {
    this._count = value
  }
  @Output() seatsChange: EventEmitter<string[]> = new EventEmitter();

  private _count: number | undefined;

  seats: Seat = {
  	totalRows: 31,
	  seatsPerRow: 6,
	  seatNaming:'rowType',
	  taken:['1A', '1B', '1F','5C','5D', '5E', '5F','21A', '11B', '18F','15C','15D', '25E', '16F'],
    booked: []
  };
  rows = new Array();

  constructor() { }

  ngOnInit(): void {
    let rows = new Array();
    let seatsInTheRow = new Array();
    let seatChar;

    if (this.seats != undefined && this.seats.hasOwnProperty('totalRows')){
      if (this.seats.seatNaming='rowType'){
        for(let row = 0; row < this.seats.totalRows; row++){
          for(let seat = 0; seat < this.seats.seatsPerRow; seat++){
            seatChar = String.fromCharCode(65 + seat)
            seatsInTheRow.push((row + 1).toString() + seatChar);
          }
          rows.push(seatsInTheRow);
          seatsInTheRow = new Array();
        }
      }
    }
    this.rows = rows;
  }

  bookAction(placeToSeat: string){
    const bookedSeatIndex: number = this.seats.booked.indexOf(placeToSeat);
    const takenSeatIndex: number = this.seats.taken.indexOf(placeToSeat);

    if(this._count === undefined || takenSeatIndex !== -1) {
      return;
    } else if(bookedSeatIndex !== -1) {
      this.seats.booked.splice(bookedSeatIndex, 1);
      this._count++;
      this.seatsChange.emit(this.seats.booked);
    }
    else if (this._count !== 0) {
      this.seats.booked.push(placeToSeat);
      this._count--;
      this.seatsChange.emit(this.seats.booked);
    }
  }
}
