import { Component, Input, OnChanges } from '@angular/core';
import { City, Filter, Journey } from '../interfaces';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnChanges {
  @Input()
  journey: Journey[] | null = [];

  @Input()
  cities: City[] | null = [];

  @Input()
  filter?: Filter;

  filteredJourney: Journey[] | undefined;

  constructor() { }

  ngOnChanges(): void {
    this.filterList()
  }

  getCityName(id: number): string | undefined {
    return this.cities?.find(city => city.id === id)?.name
  }

  filterList() {
    this.filteredJourney = this.journey?.filter(journey => journey.departureAirportId === this.filter?.departureAirportId);

  }
}
