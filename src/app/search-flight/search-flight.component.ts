import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Observable, of, pluck, tap } from 'rxjs';
import { Airport, Filter, Journey, FormFilter } from '../interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {
  public journies$: Observable<Journey[]> | undefined;
  public departureAirports$: Observable<Airport[]> | undefined;
  public destinationAirports$: Observable<Airport[]> = of([]);
  public possibleDates$: Observable<number[]> = of([]);
  public filter: Filter | undefined;
  public showList: boolean = false;
  public isFormFilled: boolean = false;
  public journeyId: number | undefined;

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
      const formValues: FormFilter = this.flightForm.getRawValue();
      const {departureAirportId, destinationAirportId, date} = formValues;
      this.filter = {departureAirportId, destinationAirportId, date}
      console.log(this.flightForm.value);
      console.log(this.journeyId);
      this.router.navigate(['/app/flight'])
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
      .getJourney(departureAirportId, destinationAirportId)
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
