import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Airport, Date, Filter, Flight, FormFilter } from '../interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {
  public flights$: Observable<Flight[]> | undefined;
  public departureAirports$: Observable<Airport[]> | undefined;
  public destinationAirports$: Observable<Airport[]> | undefined;
  public possibleDates$: Observable<Date[]> | undefined;
  public filter: Filter | undefined;
  public showList: boolean = false;

  public flightForm = new FormGroup({
    departureAirport: new FormControl(),
    destinationAirport: new FormControl(),
    date: new FormControl(),
    adultsPassagers: new FormControl(1),
    childrenPassagers: new FormControl(0),
  })

  constructor(private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.departureAirports$ = this.apiService.getDepartureAirports();
    this.destinationAirports$ = this.apiService.getDestinationAirports();
    this.possibleDates$ = this.apiService.getPossibleDates();
  }

  async submitForm() {
    this.showList = true;
    const formValues: FormFilter = this.flightForm.getRawValue();
    const {departureAirportId, destinationAirportId, date} = formValues;
    this.filter = {departureAirportId, destinationAirportId, date}
    this.router.navigate(['/flight'])
  }

  onDepartureSelect(airport: any) {
    console.log(airport)
  }
}
