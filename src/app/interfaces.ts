export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface AuthUser {
  uid: string;
  email: string;
}

export interface City {
  id: number;
  name: string;
}

export interface Journey {
  id: number;
  departureAirportId: number;
  destinationAirportId: number;
  possibleDates: number[];
}

export interface Flight {
  id: number;
  journeyId: number;
  date?: number;
  price: number;
}

export interface SearchForm {
  departureAirportId: number;
  destinationAirportId: number;
  date: number;
  adultsPassagers: number;
  childrenPassagers: number;
}

export interface Airport {
  id: number;
  airport: string;
}

export interface Seat {
  totalRows: number;
  seatsPerRow: number;
  seatNaming: string;
}
