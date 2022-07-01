import { Component, OnInit } from '@angular/core';
import { QuerySnapshot } from '@angular/fire/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { audit, lastValueFrom, Observable, switchMap } from 'rxjs';
import { Airport, Flight, Journey, PassangersCount } from '../interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
  public flight$: Observable<Flight> | any;
  public journey$: Observable<Journey> | any;
  public id: number | any;
  public departure$: Observable<Airport> | any;
  public destination$: Observable<Airport> | any;
  public passangersCount: PassangersCount | any;
  public price$: Observable<Flight> | any;

  constructor(private apiService: ApiService,
    public route: ActivatedRoute) {
      route.params.subscribe((params: Params) => {
        this.id = parseInt(params['id']);
      })
      route.queryParams.subscribe((params) => {
        this.passangersCount = {
          adult: parseInt(params['adult']),
          child: parseInt(params['child'])
        }
      })
    }

  ngOnInit(): void {

    this.flight$ = this.apiService
        .getFlight(this.id);

    this.journey$ = this.flight$
      .pipe(switchMap((flight: Flight) => this.apiService
      .getJourney(flight.journeyId)))

    this.departure$ = this.journey$
      .pipe(switchMap((journey: Journey) => this.apiService
      .getAirport(journey.departureAirportId)))

    this.destination$ = this.journey$
      .pipe(switchMap((journey: Journey) => this.apiService
      .getAirport(journey.destinationAirportId)))

    this.price$ = this.flight$
      .pipe(switchMap((flight: Flight) => this.apiService
      .getPrice(flight.price)))
  }
}
