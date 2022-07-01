import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { lastValueFrom, Observable, of, pluck, tap } from 'rxjs';
import { Airport, Journey, SearchForm, Flight } from '../interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {
  public flights$: Observable<Flight[]> = of([]);
  public journies$: Observable<Journey[] | number[]> = of([]);
  public departureAirports$: Observable<Airport[]> | undefined;
  public destinationAirports$: Observable<Airport[]> = of([]);
  public possibleDates$: Observable<number[]> = of([]);
  public showList: boolean = false;
  public isFormFilled: boolean = false;
  public journeyId: number | any;

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
    this.flightForm.controls['destinationAirport'].disable();
    this.flightForm.controls['date'].disable();
    this.flightForm.controls['adultsPassagers'].disable();
    this.flightForm.controls['childrenPassagers'].disable();
    this.departureAirports$ = this.apiService.getDepartureAirports();
  }

  dateFilter: DateFilterFn<Date | null> = (date: Date | null): boolean => {return true;}

  async submitForm() {
    if (this.flightForm.valid && this.isFormFilled) {
      this.showList = true;
      const searchFormValues: SearchForm = this.flightForm.getRawValue();
      const {departureAirportId, destinationAirportId, date} = searchFormValues;
      const formValue: SearchForm = this.flightForm.value;
      const flight: Flight = await lastValueFrom(
        this.apiService.getFlightByJourney(this.journeyId, date));
      const adults: number = this.flightForm.get('adultsPassagers')?.value;
      const children: number = this.flightForm.get('childrenPassagers')?.value;
      this.router.navigate([`/app/flight/${flight.id}`], {queryParams: { adults, children}})
    }
  }

  onDepartureSelect() {
    const departureAirportId = this.flightForm.get('departureAirport')?.value;
    this.destinationAirports$ = this.apiService.getDestinations(departureAirportId);
    this.flightForm.controls['destinationAirport'].enable();
  }

  onDestinationSelect() {
    const departureAirportId = this.flightForm.get('departureAirport')?.value;
    const destinationAirportId = this.flightForm.get('destinationAirport')?.value;
    this.possibleDates$ = this.apiService
      .getJourneyByAirports(departureAirportId, destinationAirportId)
      .pipe(
        tap(journey => this.journeyId = journey.id),
        pluck('possibleDates')
      )

    this.possibleDates$.subscribe((possibleDates: number[]) => {
      this.dateFilter = (date: Date | null) =>
        date ? !!possibleDates.find((possibleDate: number) =>
          possibleDate === date.getTime())
        : false
    });

    this.flightForm.controls['date'].enable();
  }

  onDateChange() {
    this.flightForm.controls['adultsPassagers'].enable();
    this.flightForm.controls['childrenPassagers'].enable();
    this.isFormFilled = true;
  }
}
