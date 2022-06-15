import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable, of } from 'rxjs';
import { Flight } from '../interfaces';
import flight from '../data/flights.json'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL: string = environment.apiURL;

  constructor() { }

  getAllFligths(): Observable<Flight[]> {
    return of(flight)
  }

}
