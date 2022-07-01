import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Journey, City, Airport, Flight, SearchForm } from '../interfaces';
import journies from '../data/journies.json';
import airports from '../data/airports.json';
import flights from '../data/flights.json';
import users from '../data/users.json'
import departureAirports from '../data/departureAirports.json';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL: string = environment.apiURL;
  public this: any;
  public flight: SearchForm | undefined;
  public apiKey: string = 'd07e2df67bbfb35454ed4deaa8849dbf';

  constructor() { }

  getJournies(): Observable<Journey[]> {
    return of(journies)
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

  getJourneyByAirports(departureAirportId: number, destinationAirportId: number): Observable<Journey> {
    return of(journies.find(journey =>
      journey.departureAirportId === departureAirportId
      && journey.destinationAirportId === destinationAirportId
    ) as Journey)
  }

  getFlightByJourney(journeyId: number, date: number): Observable<Flight> {
    return of(flights.find(flight =>
      flight.journeyId === journeyId
      && flight.date) as Flight)
  }

  getFlight(id: number): Observable<Flight> {
    return of(flights.find(flight =>
      flight.id === id) as Flight)
  }

  getJourney(id: number): Observable<Journey> {
    return of(journies.find(journey =>
      journey.id === id) as Journey)
  }

  getAirport(id: number): Observable<Airport> {
    return of(airports.find(airport =>
      airport.id === id) as Airport)
  }

  getPrice(price: number): Observable<Flight> {
    return of(flights.find(flight =>
      flight.price === price) as Flight)
  }

  checkLogIn(email: string, password: string): Observable<boolean> {
    return of(!!users.find(user => user.email === email && user.password === password))
  }
}
