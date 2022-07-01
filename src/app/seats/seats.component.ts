import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Seat } from '../interfaces';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {
  @Output() confirm = new EventEmitter();

  seats: Seat = {
  	totalRows: 31,
	  seatsPerRow: 6,
	  seatNaming:'rowType',
	  booked:['1A', '1B', '1F','5C','5D', '5E', '5F','21A', '11B', '18F','15C','15D', '25E', '16F']
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

  done(){
    this.confirm.emit(this.seats.booked)
  }

  bookAction(placeToSeat: string){
    if(this.seats.booked.indexOf(placeToSeat)>0){
      this.seats.booked = this.seats.booked.filter(bookedSeat => {
        return bookedSeat!=placeToSeat;
      })
    }
    else{
      this.seats.booked.push(placeToSeat)
    }
  }
}
