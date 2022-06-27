import { Component, Input, OnChanges } from '@angular/core';
import { City, Filter, Flight } from '../interfaces';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnChanges {
  @Input()
  flights: Flight[] | null = [];

  @Input()
  cities: City[] | null = [];

  @Input()
  filter?: Filter;

  filteredFlights: Flight[] | undefined;

  constructor() { }

  ngOnChanges(): void {
    this.filterList()
  }

  getCityName(id: number): string | undefined {
    return this.cities?.find(city => city.id === id)?.name
  }

  filterList() {
    this.filteredFlights = this.flights?.filter(flight => flight.departureAirportId === this.filter?.departureAirportId);

  }
}
