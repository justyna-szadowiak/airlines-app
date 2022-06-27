import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable, of } from 'rxjs';
import { Journey, City, Airport } from '../interfaces';
import cities from '../data/cities.json';
import journies from '../data/journies.json';
import airports from '../data/airports.json';
import departureAirports from '../data/departureAirports.json';
import destinationAirports from '../data/destinationAirports.json';
import possibleDates from '../data/possibleDates.json'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL: string = environment.apiURL;
  this: any;

  constructor() { }

  getJournies(): Observable<Journey[]> {
    return of(journies)
  }

  getCities(): Observable<City[]> {
    return of(cities)
  }

  getDepartureAirports(): Observable<Airport[]> {
    return of(departureAirports)
  }

  getDestinations(departureAirportId: number): Observable<Airport[]> {
    const destinationAirportIds: number[] = journies.filter(journey => journey.departureAirportId === departureAirportId)
      .map(journey => journey.destinationAirportId);
    const destinations: Airport[] = airports.filter(airport => destinationAirportIds.indexOf(airport.id) != -1)

    return of(destinations);
  }

  getJourney(departureAirportId: number, destinationAirportId: number): Observable<Journey> {
    return of(journies.find(journey =>
      journey.departureAirportId === departureAirportId
      && journey.destinationAirportId === destinationAirportId
    ) as Journey)
  }
}
