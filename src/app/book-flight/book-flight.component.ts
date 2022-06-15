import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { start } from 'repl';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Flight } from '../interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss']
})
export class BookFlightComponent implements OnInit {
  flightControl = new FormControl('');
  chooseStartingCity: Flight[] = [];
  flights$: Observable<Flight[]> | undefined | any;
  flightsItem: Flight[] | null | undefined = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.flights$ = this.apiService.getAllFligths().pipe(
      catchError(error => {
        console.error(error);
        return of(null)
      })
    );
    this.flights$ = this.flightControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: Flight[]): Flight[] | void {
    const statringCity = this.chooseStartingCity
      .filter(start => start.placeOfDeparture);

      if(statringCity) {
        return statringCity
      }
  }

  
}
