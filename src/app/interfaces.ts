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

export interface Flight {
  id: number;
  departureAirportId: number;
  destinationAirportId: number;
  possibleDate: string;
  price: number;
}

export interface Filter {
  departureAirportId: number;
  destinationAirportId: number;
  date: number;
}

export interface FormFilter extends Filter {
  adultsPassagers: number;
  childrenPassagers: number;
}

export interface Airport {
  id: number;
  airport: string;
}

export interface Date {
  possibleDate: string;
}

export interface Seat {
  totalRows: number;
  seatsPerRow: number;
  seatNaming: string;
}
