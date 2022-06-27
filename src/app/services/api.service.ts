import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable, of } from 'rxjs';
import { Flight, City, Airport, Date } from '../interfaces';
import cities from '../data/cities.json';
import flights from '../data/flights.json';
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

  getAllFligths(): Observable<Flight[]> {
    return of(flights)
  }

  getCities(): Observable<City[]> {
    return of(cities)
  }

  getDepartureAirports(): Observable<Airport[]> {
    return of(departureAirports)
  }

  getDestinationAirports(): Observable<Airport[]> {
    return of(destinationAirports);
  }

  getDestinations(departureAirportId: number): Observable<Airport[]> {
    const destinationAirportIds: number[] = flights.filter(flight => flight.departureAirportId === departureAirportId)
      .map(flight => flight.destinationAirportId);

    const destinations: Airport[] = airports.filter(airport => destinationAirportIds.indexOf(airport.id) != -1)

    return of(destinations);
  }

  getPossibleDates(): Observable<Date[]> {
    return of(possibleDates)
  }
}
