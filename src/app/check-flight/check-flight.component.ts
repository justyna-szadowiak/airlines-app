import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-check-flight',
  templateUrl: './check-flight.component.html',
  styleUrls: ['./check-flight.component.scss']
})
export class CheckFlightComponent implements OnInit {
  checkFlightOne: FormGroup;
  checkFlightTwo: FormGroup;

  constructor() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.checkFlightOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
    });

    this.checkFlightTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19)),
    });

  }

  ngOnInit(): void {
  }

}
